import type { Commands } from "./commands";
import { type CatFileCommandIntern } from "./commands/cat-file"
import fs from "fs";
import type { HashObjectCommand, HashObjectCommandIntern } from "./commands/hash-object";

interface GitClientIntern {
  run: (command: CatFileCommandIntern) => void;
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
}
