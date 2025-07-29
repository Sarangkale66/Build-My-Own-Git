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

    const folderPath = path.join(".git", "objects", folder);
    const fullPath = path.join(folderPath, file);

    if (!fs.existsSync(folderPath)) {
      exit(new Error(`Not a valid object name ${treeSha}`));
    }

    if (!fs.existsSync(fullPath)) {
      exit(new Error(`Not a valid object name ${treeSha}`));
    }

    const fileContent = fs.readFileSync(fullPath);
    const outputBuffer = zlib.unzipSync(new Uint8Array(fileContent));
    const output = outputBuffer.toString().split(NULL_BYTE);

    if (output.length < 2) {
      exit(new Error(`Invalid object format for ${treeSha}`));
    }

    const treeContent = output.slice(1).filter(e => e.includes(" "));
    const name = treeContent.map(e => e.split(" ")[1]);

    name.forEach(item => {
      if (!item.includes("100644")) print(item);
    });
  }
}