import { GitClient } from "..";
export * from "./cat-file";
export * from "./hash-object"
export * from "./ls-tree";
export * from "./update-index";
export * from "./write-tree";
export * from "./commit-tree";
export * from "./diff";
export * from "./compare-blobs"

export const gitClient = new GitClient();

export const NULL_BYTE = "\0";

export function exit(err: Error): never {
  console.error(err.message);
  process.exit(1);
}

export function print(msg: string): void {
  process.stdout.write(msg + "\n");
}