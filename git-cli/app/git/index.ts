import fs from "fs";
import type { AddCommandIntern, StatusCommandIntern, CommitCommandIntern, LogCommandIntern } from "./PorcelainCommands";
import type { CatFileCommandIntern, CommitTreeCommandIntern, CompareBlobsCommandIntern, DiffCommandIntern, HashObjectCommandIntern, LsTreeCommandIntern, UpdateIndexCommandIntern, WriteTreeCommandIntern } from "./PlumbingCommands"

export enum Commands {
  Init = "init",
  CatFile = "cat-file",
  HashObject = "hash-object",
  LsTree = "ls-tree",
  UpdateIndex = "update-index",
  WriteTree = "write-tree",
  CommitTree = "commit-tree",
  GitAdd = "add",
  GitStatus = "status",
  Commit = "commit",
  Log = "log",
  Diff = "diff",
  CompareBlob = "compare-blobs",
  Clone = "clone"
}

type CommandType = AddCommandIntern | CatFileCommandIntern | HashObjectCommandIntern | LsTreeCommandIntern | UpdateIndexCommandIntern | WriteTreeCommandIntern | CommitTreeCommandIntern | StatusCommandIntern | CommitCommandIntern | LogCommandIntern | DiffCommandIntern | CompareBlobsCommandIntern;

interface GitClientIntern {
  init: () => void;
}

export class GitClient implements GitClientIntern {

  init() {
    fs.mkdirSync(".git", { recursive: true });
    fs.mkdirSync(".git/objects", { recursive: true });
    fs.mkdirSync(".git/refs", { recursive: true });
    fs.writeFileSync(".git/HEAD", "ref: refs/heads/master\n");
    process.stdout.write("Initialized git directory");
  }

  run(command: CommandType): any {
    return command.execute();
  }

}
