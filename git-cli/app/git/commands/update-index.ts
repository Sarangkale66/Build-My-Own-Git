import path from "path";
import crypto from "crypto";
import zlib from "zlib";
import { exit } from ".";

export interface UpdateIndexCommandIntern {
  execute: () => void | Promise<void>;
}

export class UpdateIndexCommand implements UpdateIndexCommandIntern {
  private readonly filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  public async execute(): Promise<void> {
    const filePath = path.resolve(this.filename);
    if (!(await Bun.file(filePath).exists())) {
      exit(new Error(`fatal: pathspec '${this.filename}' did not match any files`));
    }

    const content = await Bun.file(filePath).arrayBuffer();
    const blobHeader = Buffer.from(`blob ${Buffer.byteLength(content)}\0`, "utf8");
    const store = Buffer.concat([blobHeader, Buffer.from(content)] as any);
    const sha = crypto.createHash("sha1").update(store as any).digest("hex");

    const objectPath = path.join(".git", "objects", sha.slice(0, 2), sha.slice(2));
    if (!(await Bun.file(objectPath).exists())) {
      const compressed = zlib.deflateSync(store as any);
      await Bun.write(objectPath, compressed as any);
    }

    const stat = await (Bun.file(filePath) as any).stat();
    const mode = 0o100644;
    const pathBuffer = Buffer.from(this.filename);
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

    const indexPath = path.join(".git", "index");
    let entries: Buffer[] = [];

    if (await Bun.file(indexPath).exists()) {
      const indexBuf = await Bun.file(indexPath).arrayBuffer();
      const index = Buffer.from(indexBuf);
      const entryCount = index.readUInt32BE(8);
      let offset = 12;

      for (let i = 0; i < entryCount; i++) {
        const pathStart = offset + 62;
        let pathEnd = pathStart;
        while (index[pathEnd] !== 0) pathEnd++;
        const pathBuf = index.subarray(pathStart, pathEnd);
        const pathStr = pathBuf.toString();

        const entrySize = 62 + pathBuf.length + 1;
        const pad = (8 - (entrySize % 8)) % 8;
        const nextOffset = offset + entrySize + pad;

        if (pathStr !== this.filename) {
          entries.push(index.subarray(offset, nextOffset));
        }

        offset = nextOffset;
      }
    }

    entries.push(newEntry);

    const indexHeader = Buffer.alloc(12);
    indexHeader.write("DIRC", 0);
    indexHeader.writeUInt32BE(2, 4);
    indexHeader.writeUInt32BE(entries.length, 8);

    const body = Buffer.concat(entries as any);
    const total = Buffer.concat([indexHeader, body] as any);
    const checksum = crypto.createHash("sha1").update(total as any).digest();
    const finalIndex = Buffer.concat([total, checksum] as any);

    await Bun.write(indexPath, finalIndex as any);
  }
}
