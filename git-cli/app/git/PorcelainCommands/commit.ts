import { readFile } from "fs/promises";
import path from "path";
import { CommitTreeCommand, exit, print } from "../PlumbingCommands";
import { gitClient } from "../PlumbingCommands/index";

export interface CommitCommandIntern {
  execute: () => void;
}

export class CommitCommand implements CommitCommandIntern {
  private readonly message;

  constructor(message: string = "") {
    this.message = message;
  }

  async execute(): Promise<void> {
    if (!this.message) exit(new Error("please provide message with '-m' flag \ncommit -m <message>"));
    const parentSha = (await readFile(path.join(".git", "refs", "heads", "master"))).toString();
    gitClient.run(new CommitTreeCommand(this.message, parentSha));
  }
}