import fs from "fs";
import { NULL_BYTE, exit, print } from ".";
import path from "path";
import zlib from "zlib";

export interface LsTreeCommandIntern {
  execute: () => void | Promise<void>;
}

export class LsTreeCommand implements LsTreeCommandIntern {
  public readonly flag: string;
  public readonly sha: string;

  constructor(flag: string, sha: string) {
    this.flag = flag;
    this.sha = sha;
  }

  public execute(): void {
    let flag = this.flag;
    let treeSha = this.sha;

    if (!treeSha && flag === "--name-only") {
      exit(new Error("Tree SHA is required"));
    }

    if (!treeSha) {
      treeSha = flag;
      flag = "";
    }

    const folder = treeSha.slice(0, 2);
    const file = treeSha.slice(2);
    const filePath = path.join(".git", "objects", folder, file);

    if (!fs.existsSync(filePath)) {
      exit(new Error(`Not a valid object name ${treeSha}`));
    }

    const compressed = fs.readFileSync(filePath);
    const uncompressed = zlib.inflateSync(compressed as any);

    const nullByteIdx = uncompressed.indexOf(0);
    if (nullByteIdx === -1) {
      exit(new Error("Invalid tree object"));
    }

    let offset = nullByteIdx + 1;

    while (offset < uncompressed.length) {
      const spaceIdx = uncompressed.indexOf(32, offset);
      const mode = uncompressed.subarray(offset, spaceIdx).toString();
      offset = spaceIdx + 1;

      const nullIdx = uncompressed.indexOf(0, offset);
      const filename = uncompressed.subarray(offset, nullIdx).toString();
      offset = nullIdx + 1;

      const shaBuffer = uncompressed.subarray(offset, offset + 20);
      const shaHex = Buffer.from(shaBuffer as any).toString("hex");
      offset += 20;

      if (flag === "--name-only") {
        print(filename);
      } else {
        const type = this.getObjectType(shaHex);
        print(`${mode} ${type} ${shaHex}\t${filename}`);
      }
    }
  }

  private getObjectType(sha: string): string {
    const folder = sha.slice(0, 2);
    const file = sha.slice(2);
    const filePath = path.join(".git", "objects", folder, file);

    if (!fs.existsSync(filePath)) return "unknown";

    const compressed = fs.readFileSync(filePath);
    const uncompressed = zlib.inflateSync(compressed as any);
    const header = uncompressed.subarray(0, uncompressed.indexOf(0)).toString();
    const [type] = header.split(" ");
    return type;
  }

}