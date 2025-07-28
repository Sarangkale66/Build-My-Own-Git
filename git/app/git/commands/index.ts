export * from "./cat-file";
export * from "./hash-object"

export enum Commands {
  Init = "init",
  CatFile = "cat-file",
  HashObject = "hash-object"
}

export const NULL_BYTE = "\0";

export function exit(err: Error): never {
  console.error(err.message);
  process.exit(1);
}

export function print(msg: string): void {
  process.stdout.write(msg + "\n");
}