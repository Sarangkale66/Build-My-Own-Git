import path from "path";
import crypto from "crypto";
import zlib from "zlib";
import { readdir } from "node:fs/promises";
import { statSync } from "node:fs";
import { print } from ".";

export interface WriteTreeCommandIntern {
  execute: () => Promise<void>;
}

class WriteTreeCommand implements WriteTreeCommandIntern {
  private readonly currentDir: string;

  constructor(currentDir: string) {
    this.currentDir = currentDir;
  }

  private async blobOf(filePath: string): Promise<string> {
    const file = Bun.file(filePath);
    const data = Buffer.from(await file.arrayBuffer());
    const metadata = `blob ${data.length}\0`;
    const blob: any = Buffer.concat([Buffer.from(metadata, "utf8"), data] as any);
    const key = crypto.createHash("sha1").update(blob).digest("hex");

    const dir = path.join(".git", "objects", key.slice(0, 2));
    const fileName = key.slice(2);
    const fullPath = path.join(dir, fileName);

    const existing = Bun.file(fullPath);
    if (!(await existing.exists())) {
      await Bun.write(fullPath, zlib.deflateSync(blob) as any);
    }

    return key;
  }

  public async execute(): Promise<void> {
    const writeTree = async (currentDir: string): Promise<string> => {
      const files = (await readdir(currentDir, { withFileTypes: true }))
        .filter(entry => entry.name !== ".git");

      const entries = await Promise.all(files.map(async (entry) => {
        const fullPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          const treeId = await writeTree(fullPath);
          return { mode: "40000", name: entry.name, id: treeId };
        } else {
          const id = await this.blobOf(fullPath);
          return { mode: "100644", name: entry.name, id: id };
        }
      }));

      entries.sort((a, b) => Buffer.from(a.name).compare(Buffer.from(b.name) as any));

      const treeData = Buffer.concat(entries.map(file => {
        const head = Buffer.from(`${file.mode} ${file.name}\0`, "utf8");
        const id = Buffer.from(file.id, "hex");
        return Buffer.concat([head, id] as any);
      }) as any);

      const metadata = Buffer.from(`tree ${treeData.length}\0`, "utf8");
      const tree: any = Buffer.concat([metadata, treeData] as any);
      const treeId = crypto.createHash("sha1").update(tree).digest("hex");

      const dir = path.join(".git", "objects", treeId.slice(0, 2));
      const file = treeId.slice(2);
      const fullPath = path.join(dir, file);

      const existing = Bun.file(fullPath);
      if (!(await existing.exists())) {
        await Bun.write(fullPath, zlib.deflateSync(tree) as any);
      }

      return treeId;
    };

    const treeId = await writeTree(this.currentDir);
    print(treeId);
  }
}

export { WriteTreeCommand };
