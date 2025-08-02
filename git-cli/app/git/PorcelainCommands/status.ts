import path from "path";
import crypto from "crypto";
import { readFile } from "fs/promises";
import { Glob } from "bun";
import { print } from "../PlumbingCommands";

export interface StatusCommandIntern {
  execute: () => void;
}

export class StatusCommand {
  async execute(): Promise<void> {
    const indexPath = path.join(".git", "index");
    const indexExists = await Bun.file(indexPath).exists();
    if (!indexExists) {
      print("No changes added to commit");
      return;
    }

    const index = Buffer.from(await readFile(indexPath) as any);
    const entryCount = index.readUInt32BE(8);
    let offset = 12;
    const indexEntries = new Map<string, string>();

    for (let i = 0; i < entryCount; i++) {
      const pathStart = offset + 62;
      let pathEnd = pathStart;
      while (index[pathEnd] !== 0) pathEnd++;
      const filePath = index.subarray(pathStart, pathEnd).toString();
      const sha = index.subarray(offset + 40, offset + 60).toString("hex");

      indexEntries.set(filePath.replace(/\\/g, "/"), sha);

      const entrySize = 62 + (pathEnd - pathStart) + 1;
      const pad = (8 - (entrySize % 8)) % 8;
      offset += entrySize + pad;
    }

    const cwd = process.cwd();
    const glob = new Glob("**/*");
    const allFiles: string[] = [];
    for await (const file of glob.scan({ cwd })) {
      if (file.startsWith(".git")) continue;
      allFiles.push("./" + file.replace(/\\/g, "/"));
    }

    const modified: string[] = [];
    const untracked: string[] = [];

    for (const file of allFiles) {
      const filePath = path.join(cwd, file);
      const fileBuf = Buffer.from(await Bun.file(filePath).arrayBuffer());
      const blobHeader = Buffer.from(`blob ${fileBuf.length}\0`, "utf8");
      const store: any = Buffer.concat([blobHeader, fileBuf] as any);
      const sha = crypto.createHash("sha1").update(store).digest("hex");

      if (!indexEntries.has(file)) {
        untracked.push(file);
      } else if (indexEntries.get(file) !== sha) {
        modified.push(file);
      }
    }

    if (modified.length === 0 && untracked.length === 0) {
      print("No untracked files");
    } else {
      if (modified.length > 0) {
        print("Changes to be committed:");
        modified.forEach(file => console.log(`\tmodified: ${file} M`));
      }

      if (untracked.length > 0) {
        print("Untracked files:");
        untracked.forEach(file => console.log(`\t${file} U`));
      }
    }
  }
}