import path from "path";
import crypto from "crypto";
import zlib from "zlib";
import { print, exit } from ".";
import { readdir, mkdir } from "fs/promises";
import { existsSync } from "fs";

export interface CommitTreeCommandIntern {
  execute: () => Promise<string>;
}

export class CommitTreeCommand implements CommitTreeCommandIntern {
  private readonly message: string;
  private readonly parentSha?: string;

  constructor(message: string, parentSha?: string) {
    this.message = message;
    this.parentSha = parentSha;
  }

  private async getStagedFilePaths(): Promise<Set<string>> {
    const indexPath = path.join(".git", "index");
    const st = new Set<string>();

    if (!(await Bun.file(indexPath).exists())) {
      throw new Error("fatal: no index file found");
    }

    const indexBuf = Buffer.from(await Bun.file(indexPath).arrayBuffer());
    const entryCount = indexBuf.readUInt32BE(8);
    let offset = 12;

    for (let i = 0; i < entryCount; i++) {
      const pathStart = offset + 62;
      let pathEnd = pathStart;
      while (indexBuf[pathEnd] !== 0) pathEnd++;

      const rawPath = indexBuf.subarray(pathStart, pathEnd).toString();
      st.add(path.normalize(rawPath).replace(/\\/g, "/"));

      const entrySize = 62 + (pathEnd - pathStart) + 1;
      const pad = (8 - (entrySize % 8)) % 8;
      offset += entrySize + pad;
    }

    return st;
  }

  private async blobOf(filePath: string): Promise<string> {
    const file = Bun.file(filePath);
    const data = Buffer.from(await file.arrayBuffer());
    const metadata = `blob ${data.length}\0`;
    const blob: any = Buffer.concat([Buffer.from(metadata), data] as any);
    const sha = crypto.createHash("sha1").update(blob).digest("hex");
    const objectPath = path.join(".git", "objects", sha.slice(0, 2), sha.slice(2));
    if (!existsSync(objectPath)) {
      await mkdir(path.dirname(objectPath), { recursive: true });
      await Bun.write(objectPath, zlib.deflateSync(blob) as any);
    }
    return sha;
  }

  private async writeTreeFromStagedFiles(dir: string, st: Set<string>, prefix = ""): Promise<string> {
    const entries = await readdir(path.join(dir, prefix), { withFileTypes: true });

    const treeEntries = await Promise.all(entries.map(async (entry) => {
      if (entry.name === ".git") return null;

      const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
      const fullPath = path.join(dir, relativePath);

      if (entry.isDirectory()) {
        const treeSha = await this.writeTreeFromStagedFiles(dir, st, relativePath);
        if (!treeSha) return null;
        const head = Buffer.from(`40000 ${entry.name}\0`, "utf8");
        const id = Buffer.from(treeSha, "hex");
        return Buffer.concat([head, id] as any);
      } else {
        if (!st.has(relativePath)) return null;
        const blobSha = await this.blobOf(fullPath);
        const head = Buffer.from(`100644 ${entry.name}\0`, "utf8");
        const id = Buffer.from(blobSha, "hex");
        return Buffer.concat([head, id] as any);
      }
    }));

    const filtered: any = treeEntries.filter(Boolean) as Buffer[];
    if (filtered.length === 0) return "";

    filtered.sort((a: any, b: any) => a.compare(b));
    const treeData = Buffer.concat(filtered);
    const treeHeader = Buffer.from(`tree ${treeData.length}\0`, "utf8");
    const treeObject: any = Buffer.concat([treeHeader, treeData] as any);

    const treeSha = crypto.createHash("sha1").update(treeObject).digest("hex");
    const objectPath = path.join(".git", "objects", treeSha.slice(0, 2), treeSha.slice(2));
    if (!existsSync(objectPath)) {
      await mkdir(path.dirname(objectPath), { recursive: true });
      await Bun.write(objectPath, zlib.deflateSync(treeObject) as any);
    }

    return treeSha;
  }

  public async execute(): Promise<string> {
    const stagedPaths = await this.getStagedFilePaths();
    const treeSha = await this.writeTreeFromStagedFiles(process.cwd(), stagedPaths);
    const refPath = path.join(".git", "refs", "heads", "master");

    const author = "Sarang <sarangkale66@gmail.com>";
    const timestamp = Math.floor(Date.now() / 1000);
    const timezone = "+0530";

    let commitContent = `tree ${treeSha}\n`;
    if (this.parentSha) {
      commitContent += `parent ${this.parentSha}\n`;
    }
    commitContent += `author ${author} ${timestamp} ${timezone}\n`;
    commitContent += `committer ${author} ${timestamp} ${timezone}\n\n`;
    commitContent += `${this.message}\n`;

    const commitHeader = `commit ${Buffer.byteLength(commitContent)}\0`;
    const fullCommit: any = Buffer.concat([
      Buffer.from(commitHeader),
      Buffer.from(commitContent),
    ] as any);

    const commitSha = crypto.createHash("sha1").update(fullCommit).digest("hex");
    const commitObjectPath = path.join(".git", "objects", commitSha.slice(0, 2), commitSha.slice(2));
    if (!existsSync(commitObjectPath)) {
      await mkdir(path.dirname(commitObjectPath), { recursive: true });
      await Bun.write(commitObjectPath, zlib.deflateSync(fullCommit) as any);
    }

    await Bun.write(refPath, commitSha + "\n");

    print(commitSha)
    return commitSha;
  }
}
