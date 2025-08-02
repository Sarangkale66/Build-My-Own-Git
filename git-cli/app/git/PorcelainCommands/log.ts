import path from "path";
import fs from "fs";
import zlib from "zlib";
import { readFile } from "fs/promises";
import { CatFileCommand, exit, gitClient, print } from "../PlumbingCommands";

export interface LogCommandIntern {
  execute: () => Promise<void>
}

export class LogCommand implements LogCommandIntern {
  async execute(): Promise<void> {
    let headRef = (await readFile(".git/HEAD", "utf8")).trim();
    if (headRef.startsWith("ref:")) {
      const refPath = headRef.split(" ")[1];
      headRef = (await readFile(path.join(".git", refPath), "utf8")).trim();
    }

    let currentSha = headRef;

    while (currentSha) {
      const objPath = path.join(".git", "objects", currentSha.slice(0, 2), currentSha.slice(2));
      if (!fs.existsSync(objPath)) {
        exit(new Error(`fatal: object ${currentSha} not found`));
      }
      print("commit " + currentSha);
      const content = gitClient.run(new CatFileCommand("-p", currentSha)) as string;

      const lines = content.split("\n");
      const parentLine = lines.find(l => l.startsWith("parent ")) || "";

      currentSha = parentLine.split(" ")[1] || "";
    }
  }
}
