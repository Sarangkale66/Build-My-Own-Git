import path from "path";
import fs from "fs";
import zlib from "zlib";
import { NULL_BYTE, print, exit } from ".";

export interface CatFileCommandIntern {
  execute: () => string;
}

export class CatFileCommand implements CatFileCommandIntern {
  private readonly flag: string;
  private readonly commitSHA: string;

  constructor(flag: string = "", commitSHA: string = "") {
    this.flag = flag;
    this.commitSHA = commitSHA;
  }

  execute(): string {
    const flag = this.flag;
    const commitSHA = this.commitSHA;

    if (flag === "-p") {
      const folder = commitSHA.slice(0, 2);
      const file = commitSHA.slice(2);
      const objectPath = path.join(process.cwd(), ".git", "objects", folder, file);

      if (!fs.existsSync(objectPath)) {
        exit(new Error(`fatal: Not a valid object name ${commitSHA}`));
      }

      const fileContent = fs.readFileSync(objectPath);
      const decompressed = zlib.unzipSync(new Uint8Array(fileContent));
      const nullIndex = decompressed.indexOf(NULL_BYTE);

      if (nullIndex === -1) {
        exit(new Error(`Invalid object format for ${commitSHA}`));
      }

      const blobContent = decompressed.subarray(nullIndex + 1).toString();
      print(blobContent);
      return blobContent;
    }
    exit(new Error("Not valid flag try '-p' after cat-file"))
  }
}
