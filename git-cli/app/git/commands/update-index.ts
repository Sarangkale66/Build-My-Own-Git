import path from "path";
import crypto from "crypto";
import zlib from "zlib";
import { exit } from ".";
import { readdir, mkdir } from "fs/promises";

export interface UpdateIndexCommandIntern {
  execute: () => void | Promise<void>;
}

export class UpdateIndexCommand {
  private readonly filename: string;
  private readonly flag: string;

  constructor(flag: string, filename: string) {
    this.filename = filename;
    this.flag = flag;
  }

  public async execute(): Promise<void> {
    let filename = this.filename;
    let flag = this.flag;
    let remove = false;

    if (flag === "--remove") {
      remove = true;
    } else {
      filename = flag;
    }

    if (!filename) {
      exit(new Error("fatal: pathspec is required"))
    }

    const indexPath = path.join(".git", "index");
    const entries: Buffer[] = [];

    if (await Bun.file(indexPath).exists()) {
      const index = Buffer.from(await Bun.file(indexPath).arrayBuffer());
      const entryCount = index.readUInt32BE(8);
      let offset = 12;

      for (let i = 0; i < entryCount; i++) {
        const pathStart = offset + 62;
        let pathEnd = pathStart;
        while (index[pathEnd] !== 0) pathEnd++;
        const pathBuf = index.subarray(pathStart, pathEnd);
        const pathStr = pathBuf.toString();

        const entrySize = 62 + pathBuf.length + 1;
        const padding = (8 - (entrySize % 8)) % 8;
        const nextOffset = offset + entrySize + padding;

        if (pathStr === filename) {
          offset = nextOffset;
          continue;
        }

        entries.push(index.subarray(offset, nextOffset));
        offset = nextOffset;
      }
    }

    if (!remove) {
      const filePath = path.resolve(filename);
      const file: any = Bun.file(filePath);
      if (!(await file.exists())) {
        exit(new Error(`fatal: pathspec '${filename}' did not match any files`))
      }

      const content = await file.arrayBuffer();
      const blobHeader = Buffer.from(`blob ${content.byteLength}\0`, "utf8");
      const store: any = Buffer.concat([blobHeader, Buffer.from(content)] as any);
      const sha = crypto.createHash("sha1").update(store).digest("hex");

      const objectPath = path.join(".git", "objects", sha.slice(0, 2), sha.slice(2));
      if (!(await Bun.file(objectPath).exists())) {
        const compressed: any = zlib.deflateSync(store);
        await mkdir(path.dirname(objectPath), { recursive: true });
        await Bun.write(objectPath, compressed);
      }

      const stat = await file.stat();
      const mode = 0o100644;
      const pathBuffer = Buffer.from(filename);
      const nullPad = Buffer.alloc(1);
      const entryLen = 62 + pathBuffer.length + 1;
      const padLength = (8 - (entryLen % 8)) % 8;
      const padding = Buffer.alloc(padLength);

      const entry: any = Buffer.alloc(62);
      entry.writeUInt32BE(0, 0);
      entry.writeUInt32BE(0, 4);
      entry.writeUInt32BE(0, 8);
      entry.writeUInt32BE(0, 12);
      entry.writeUInt32BE(0, 16);
      entry.writeUInt32BE(0, 20);
      entry.writeUInt32BE(mode, 24);
      entry.writeUInt32BE(0, 28);
      entry.writeUInt32BE(0, 32);
      entry.writeUInt32BE(stat.size, 36);
      Buffer.from(sha, "hex").copy(entry, 40);
      entry.writeUInt16BE(pathBuffer.length, 60);

      const newEntry = Buffer.concat([entry, pathBuffer, nullPad, padding] as any);
      entries.push(newEntry);
    }

    const indexHeader = Buffer.alloc(12);
    indexHeader.write("DIRC", 0);
    indexHeader.writeUInt32BE(2, 4);
    indexHeader.writeUInt32BE(entries.length, 8);

    const body = Buffer.concat(entries as any);
    const total: any = Buffer.concat([indexHeader, body] as any);
    const checksum = crypto.createHash("sha1").update(total).digest();
    const finalIndex: any = Buffer.concat([total, checksum]);

    await Bun.write(indexPath, finalIndex);
  }
}