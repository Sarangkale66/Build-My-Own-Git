import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import zlib from "zlib";
import { exit } from ".";

export interface DiffCommandIntern {
  execute: () => Promise<void>;
}

export class DiffCommand implements DiffCommandIntern {
  private readonly option: string;
  private readonly args: string[];

  constructor(option: string, args: string[] = []) {
    this.option = option;
    this.args = args;
  }

  public async execute(): Promise<void> {
    switch (this.option) {
      case "1":
        await this.diffWorkingDirVsIndex();
        break;
      case "2":
        await this.diffIndexVsHEAD();
        break;
      case "3":
        await this.diffWorkingDirVsHEAD();
        break;
      case "4":
        if (this.args.length !== 2) {
          exit(new Error("Usage: diff 4 <commitA> <commitB>"));
        }
        await this.diffCommits(this.args[0], this.args[1]);
        break;
      default:
        exit(new Error("Invalid diff option. Use 1, 2, 3, or 4."));
    }
  }

  // --- Helpers ---

  private normalize(p: string) {
    return p.replace(/\\/g, "/");
  }

  private async readObject(sha: string): Promise<{ type: string; content: Buffer }> {
    const filePath = path.join(".git", "objects", sha.slice(0, 2), sha.slice(2));
    const compressed: any = await fs.readFile(filePath);
    const decompressed = zlib.inflateSync(compressed);
    const nullIndex = decompressed.indexOf(0);
    const header = decompressed.slice(0, nullIndex).toString();
    const [type] = header.split(" ");
    const content = decompressed.slice(nullIndex + 1);
    return { type, content };
  }

  private async resolveRef(refOrSha: string): Promise<string> {
    if (/^[0-9a-f]{40}$/.test(refOrSha)) return refOrSha;

    if (refOrSha === "HEAD") {
      const headPath = path.join(".git", "HEAD");
      const ref = (await fs.readFile(headPath, "utf8")).trim();
      if (ref.startsWith("ref:")) {
        const refPath = path.join(".git", ref.slice(5));
        return (await fs.readFile(refPath, "utf8")).trim();
      }
      return ref;
    }

    const refPath = path.join(".git", "refs", "heads", refOrSha);
    return (await fs.readFile(refPath, "utf8")).trim();
  }

  // --- Index ---

  private async getIndexEntries(): Promise<Map<string, string>> {
    const indexPath = path.join(".git", "index");
    const entries = new Map<string, string>();

    if (!(await fs.stat(indexPath).catch(() => false))) return entries;

    const indexBuf = await fs.readFile(indexPath);
    const entryCount = indexBuf.readUInt32BE(8);
    let offset = 12;

    for (let i = 0; i < entryCount; i++) {
      const pathStart = offset + 62;
      let pathEnd = pathStart;
      while (indexBuf[pathEnd] !== 0) pathEnd++;

      const filePath = indexBuf.subarray(pathStart, pathEnd).toString();
      const sha = indexBuf.subarray(offset + 40, offset + 60).toString("hex");

      const entrySize = 62 + (pathEnd - pathStart) + 1;
      const pad = (8 - (entrySize % 8)) % 8;
      offset += entrySize + pad;

      entries.set(this.normalize(filePath), sha);
    }

    return entries;
  }

  // --- Trees & Commits ---

  private async getCommitTree(commitSha: string): Promise<string> {
    const { type, content } = await this.readObject(commitSha);
    if (type !== "commit") exit(new Error("Not a commit object"));

    const text = content.toString();
    const match = text.match(/^tree ([0-9a-f]{40})/m);
    if (!match) exit(new Error("No tree found in commit"));
    return match[1];
  }

  private async expandTree(treeSha: string, prefix = ""): Promise<Map<string, string>> {
    const entries = new Map<string, string>();
    const { type, content } = await this.readObject(treeSha);
    if (type !== "tree") exit(new Error("Not a tree object"));

    let offset = 0;
    while (offset < content.length) {
      const modeEnd = content.indexOf(32, offset);
      const mode = content.subarray(offset, modeEnd).toString();
      offset = modeEnd + 1;

      const nameEnd = content.indexOf(0, offset);
      const name = content.subarray(offset, nameEnd).toString();
      offset = nameEnd + 1;

      const sha = content.subarray(offset, offset + 20).toString("hex");
      offset += 20;

      const entryPath = this.normalize(prefix ? `${prefix}/${name}` : name);
      if (mode.startsWith("40000") || mode === "040000") {
        const subTree = await this.expandTree(sha, entryPath);
        for (const [k, v] of subTree) entries.set(k, v);
      } else {
        entries.set(entryPath, sha);
      }
    }
    return entries;
  }

  private async getHEADTreeEntries(): Promise<Map<string, string>> {
    const headSha = await this.resolveRef("HEAD");
    const treeSha = await this.getCommitTree(headSha);
    return this.expandTree(treeSha);
  }

  // --- Diff Modes ---

  private async diffWorkingDirVsIndex(): Promise<void> {
    const index = await this.getIndexEntries();
    for (const [filePath, sha] of index) {
      const content = await fs.readFile(filePath).catch(() => null);
      if (!content) {
        console.log(`deleted:   ${filePath}`);
        continue;
      }
      const blob: any = Buffer.concat([
        Buffer.from(`blob ${content.length}\0`, "utf8"),
        content,
      ] as any);
      const hash = crypto.createHash("sha1").update(blob).digest("hex");
      if (hash !== sha) console.log(`modified:  ${filePath}`);
    }
  }

  private async diffIndexVsHEAD(): Promise<void> {
    const index = await this.getIndexEntries();
    const head = await this.getHEADTreeEntries();

    for (const [filePath, sha] of index) {
      if (!head.has(filePath)) {
        console.log(`added:     ${filePath}`);
      } else if (head.get(filePath) !== sha) {
        console.log(`modified:  ${filePath}`);
      }
    }

    for (const [filePath] of head) {
      if (!index.has(filePath)) {
        console.log(`deleted:   ${filePath}`);
      }
    }
  }

  private async diffWorkingDirVsHEAD(): Promise<void> {
    const head = await this.getHEADTreeEntries();
    for (const [filePath, sha] of head) {
      const content = await fs.readFile(filePath).catch(() => null);
      if (!content) {
        console.log(`deleted:   ${filePath}`);
        continue;
      }
      const blob: any = Buffer.concat([
        Buffer.from(`blob ${content.length}\0`, "utf8"),
        content,
      ] as any);
      const hash = crypto.createHash("sha1").update(blob).digest("hex");
      if (hash !== sha) console.log(`modified:  ${filePath}`);
    }
  }

  private async diffCommits(commitA: string, commitB: string): Promise<void> {
    const shaA = await this.resolveRef(commitA);
    const shaB = await this.resolveRef(commitB);

    const treeA = await this.getCommitTree(shaA);
    const treeB = await this.getCommitTree(shaB);

    const filesA = await this.expandTree(treeA);
    const filesB = await this.expandTree(treeB);

    const allFiles = new Set([...filesA.keys(), ...filesB.keys()]);

    for (const file of allFiles) {
      const hashA = filesA.get(file) || "-";
      const hashB = filesB.get(file) || "-";
      if (hashA !== hashB) {
        console.log(`${file} ${hashA} ${hashB}`);
      }
    }
  }
}