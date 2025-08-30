import path from "path";
import fs from "fs/promises";
import zlib from "zlib";
import { exit } from ".";

export interface CompareBlobsCommandIntern {
  execute: () => Promise<void>;
}

export class CompareBlobsCommand implements CompareBlobsCommandIntern {
  private readonly hash1: string;
  private readonly hash2: string;

  constructor(hash1: string, hash2: string) {
    this.hash1 = hash1;
    this.hash2 = hash2;
  }

  private async readObject(hash: string): Promise<{ type: string; content: Buffer }> {
    const filePath = path.join(".git", "objects", hash.slice(0, 2), hash.slice(2));
    const compressed: any = await fs.readFile(filePath);
    const decompressed = zlib.inflateSync(compressed);
    const nullIndex = decompressed.indexOf(0);
    const header = decompressed.slice(0, nullIndex).toString();
    const [type] = header.split(" ");
    const content = decompressed.slice(nullIndex + 1);
    return { type, content };
  }

  public async execute(): Promise<void> {
    const obj1 = await this.readObject(this.hash1);
    const obj2 = await this.readObject(this.hash2);

    if (obj1.type !== "blob" || obj2.type !== "blob") {
      exit(new Error("Both objects must be blobs (file contents)."));
    }

    const lines1 = obj1.content.toString().split("\n");
    const lines2 = obj2.content.toString().split("\n");

    let i = 0, j = 0;
    while (i < lines1.length || j < lines2.length) {
      const l1 = lines1[i];
      const l2 = lines2[j];

      if (l1 === l2) {
        if (l1 !== undefined) console.log(`• • ${l1}`);
        i++;
        j++;
      } else if (l1 !== undefined && (l2 === undefined || !lines2.includes(l1))) {
        console.log(`-- ${l1}`);
        i++;
      } else if (l2 !== undefined && (l1 === undefined || !lines1.includes(l2))) {
        console.log(`++ ${l2}`);
        j++;
      } else {
        console.log(`-- ${l1}`);
        console.log(`++ ${l2}`);
        i++;
        j++;
      }
    }
  }
}