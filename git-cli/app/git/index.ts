import type { CatFileCommandIntern, HashObjectCommandIntern, LsTreeCommandIntern } from "./commands"
import fs from "fs";

export enum Commands {
  Init = "init",
  CatFile = "cat-file",
  HashObject = "hash-object",
  LsTree = "ls-tree",
}

interface GitClientIntern {
  init: () => void;
  run: (command: CatFileCommandIntern) => void;
  hash: (command: HashObjectCommandIntern) => void;
  readTree: (command: LsTreeCommandIntern) => void;
}

export class GitClient implements GitClientIntern {

  init() {
    fs.mkdirSync(".git", { recursive: true });
    fs.mkdirSync(".git/objects", { recursive: true });
    fs.mkdirSync(".git/refs", { recursive: true });
    fs.writeFileSync(".git/HEAD", "ref: refs/heads/main\n");
    process.stdout.write("Initialized git directory");
  }

  run(command: CatFileCommandIntern): void {
    command.execute();
  }

  hash(command: HashObjectCommandIntern): void {
    command.execute();
  }

  readTree(command: LsTreeCommandIntern): void {
    command.execute();
  }
}
