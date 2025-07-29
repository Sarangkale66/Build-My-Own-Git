import fs from "fs";
import path from "path";
import zlib from "zlib";
import { exit, print } from ".";

export interface LsTreeCommandIntern {
  execute: () => void;
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
    let inputSha = this.sha;

    if (!inputSha && flag === "--name-only") {
      exit(new Error("Tree SHA is required"));
    }

    if (!inputSha) {
      inputSha = flag;
      flag = "";
    }

    // Load the initial object
    const folder = inputSha.slice(0, 2);
    const file = inputSha.slice(2);
    const filePath = path.join(".git", "objects", folder, file);

    if (!fs.existsSync(filePath)) {
      exit(new Error(`Not a valid object name ${inputSha}`));
    }

    const compressed = fs.readFileSync(filePath);
    const uncompressed = zlib.inflateSync(compressed as any);
    const nullByteIdx = uncompressed.indexOf(0);
    if (nullByteIdx === -1) {
      exit(new Error("Invalid object format"));
    }

    const header = uncompressed.subarray(0, nullByteIdx).toString();
    const [type] = header.split(" ");

    let treeSha = inputSha;
    let treeBuffer = uncompressed;

    if (type === "commit") {
      const commitContent = uncompressed.subarray(nullByteIdx + 1).toString();
      const treeLine = commitContent.split("\n").find(line => line.startsWith("tree "));
      if (!treeLine) exit(new Error("No tree found in commit object"));
      treeSha = treeLine.split(" ")[1];

      const treeFolder = treeSha.slice(0, 2);
      const treeFile = treeSha.slice(2);
      const treePath = path.join(".git", "objects", treeFolder, treeFile);

      if (!fs.existsSync(treePath)) {
        exit(new Error(`Tree object ${treeSha} not found`));
      }

      const treeCompressed = fs.readFileSync(treePath);
      treeBuffer = zlib.inflateSync(treeCompressed as any);
    }

    // Now parse the tree object
    const treeNullIdx = treeBuffer.indexOf(0);
    if (treeNullIdx === -1) {
      exit(new Error("Invalid tree object"));
    }

    let offset = treeNullIdx + 1;

    while (offset < treeBuffer.length) {
      const spaceIdx = treeBuffer.indexOf(32, offset);
      const mode = treeBuffer.subarray(offset, spaceIdx).toString();
      offset = spaceIdx + 1;

      const nullIdx = treeBuffer.indexOf(0, offset);
      const filename = treeBuffer.subarray(offset, nullIdx).toString();
      offset = nullIdx + 1;

      const shaBuffer = treeBuffer.subarray(offset, offset + 20);
      const shaHex = Buffer.from(shaBuffer as any).toString("hex");
      offset += 20;

      if (flag === "--name-only") {
        print(filename);
      } else {
        const entryType = this.getObjectType(shaHex);
        print(`${mode} ${entryType} ${shaHex}\t${filename}`);
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