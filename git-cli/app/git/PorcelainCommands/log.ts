import path from "path";
import fs from "fs";
import zlib from "zlib";
import { readFile } from "fs/promises";

export interface LogCommandIntern {
  execute: () => Promise<void>
}

export class LogCommand implements LogCommandIntern {
  async execute(): Promise<void> {
    let headRef = (await readFile(".git/HEAD", "utf8")).trim();
    if (headRef.startsWith("ref:")) {
      const refPath = headRef.split(" ")[1];
      console.log(refPath);

      headRef = (await readFile(path.join(".git", refPath), "utf8")).trim();
    }

    let currentSha = headRef;

    while (currentSha) {
      const objPath = path.join(".git", "objects", currentSha.slice(0, 2), currentSha.slice(2));
      if (!fs.existsSync(objPath)) {
        console.error(`fatal: object ${currentSha} not found`);
        break;
      }

      const compressed: any = fs.readFileSync(objPath);
      const buffer = zlib.inflateSync(compressed);
      const nullIndex = buffer.indexOf(0);
      const content = buffer.subarray(nullIndex + 1).toString();

      const lines = content.split("\n");
      const treeLine = lines.find(l => l.startsWith("tree ")) || "";
      const parentLine = lines.find(l => l.startsWith("parent ")) || "";
      const authorLine = lines.find(l => l.startsWith("author ")) || "";
      const committerLine = lines.find(l => l.startsWith("committer ")) || "";

      const messageStart = lines.findIndex(l => l === "") + 1;
      const message = lines.slice(messageStart).join("\n");

      console.log(`commit ${currentSha}`);
      if (authorLine) console.log(authorLine);
      if (committerLine && committerLine !== authorLine) console.log(committerLine);
      console.log();
      console.log(`    ${message.trim()}`);
      console.log();

      currentSha = parentLine.split(" ")[1] || "";
    }
  }
}
