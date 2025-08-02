import path from "path";
import fs from "fs";
import { stat } from "fs/promises";
import { UpdateIndexCommand } from "../PlumbingCommands/index";

const glob = new Bun.Glob("**/*");

export interface AddCommandIntern {
  execute: () => Promise<void>;
}

export class AddCommand implements AddCommandIntern {
  private readonly target: string;

  constructor(target: string) {
    this.target = target;
  }

  private async collectFiles(): Promise<string[]> {
    const cwd = process.cwd();

    if (this.target === ".") {
      const fileList: string[] = [];
      for await (const file of glob.scan({ cwd })) {
        const fullPath = path.join(cwd, file);
        if (
          !file.startsWith(".git/") &&
          !fs.statSync(fullPath).isDirectory()
        ) {
          fileList.push(file.replace(/\\/g, "/"));
        }
      }
      return fileList;
    }

    const fullPath = path.join(cwd, this.target);
    if (fs.existsSync(fullPath)) {
      const stats = await stat(fullPath);
      if (stats.isFile()) {
        return [this.target.replace(/\\/g, "/")];
      }
    }

    throw new Error(`fatal: pathspec '${this.target}' did not match any files`);
  }

  public async execute(): Promise<void> {
    const files = await this.collectFiles();

    for (const filePath of files) {
      const fullPath = path.resolve(filePath).replace(process.cwd(), ".");
      const updateIndex = new UpdateIndexCommand("", fullPath);
      await updateIndex.execute();
    }
  }
}