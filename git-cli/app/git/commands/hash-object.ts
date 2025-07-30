import path from "path";
import fs from "fs";
import zlib from "zlib";
import { exit, NULL_BYTE } from ".";

export interface HashObjectCommandIntern {
  execute: () => void | Promise<void>;
}

export class HashObjectCommand implements HashObjectCommandIntern {
  private readonly flag: string;
  private readonly filepath: string;

  constructor(flag: string, filepath: string) {
    this.flag = flag;
    this.filepath = filepath;
  }

  async execute(): Promise<void> {
    const flag = this.flag;
    const filepath = path.resolve(this.filepath);
    const dotGitPath = process.cwd();

    const file = Bun.file(filepath);
    if (!(await file.exists())) {
      exit(new Error(`could not open ${this.filepath} for reading: No such file or directory`));
    }

    const fileContent = await file.arrayBuffer();
    const fileLength = fileContent.byteLength;

    const header = await new Blob([`blob ${fileLength}${NULL_BYTE}`]).arrayBuffer();
    const blob = await new Blob([header, fileContent]).arrayBuffer();

    const hash = new Bun.CryptoHasher("sha1").update(blob).digest("hex");

    if (flag === "-w") {
      const folder = hash.slice(0, 2);
      const file = hash.slice(2);

      const completePath = path.join(dotGitPath, ".git", "objects", folder);
      if (!fs.existsSync(completePath)) {
        fs.mkdirSync(completePath, { recursive: true });
      }

      const compressData = zlib.deflateSync(new Uint8Array(blob));
      const objectFilePath = path.join(completePath, file);

      const bytesWritten = await Bun.write(objectFilePath, new Uint8Array(compressData));
      if (bytesWritten !== compressData.byteLength) {
        exit(new Error(`Failed to write object file ${objectFilePath}. Expected ${compressData.byteLength} bytes, wrote ${bytesWritten} bytes.`));
      }
    }

    process.stdout.write(hash + "\n");
  }
}
