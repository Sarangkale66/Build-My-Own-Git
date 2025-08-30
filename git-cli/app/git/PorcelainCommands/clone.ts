import path from "path";
import fs from "fs";

export class CloneCommand {
  private readonly url: string;
  private readonly gitDir = path.join(process.cwd(), ".git");

  constructor(url: string) {
    this.url = url;
  }

  async execute(): Promise<void> {
    console.log("🚀 Starting clone from:", this.url);

    this.initGitDir();

    const refs = await this.fetchRefs();
    console.log("✅ Refs fetched:", refs);

    const wants = Object.values(refs);
    if (wants.length === 0) {
      console.error("❌ No refs found on remote");
      return;
    }

    const packData = await this.fetchPack(wants);
    console.log("✅ Pack downloaded. Size:", packData.length);

    this.parsePack(packData);
    console.log("🎉 Clone finished (basic).");
  }

  private initGitDir(): void {
    const gitDir = this.gitDir; // e.g., path.join(process.cwd(), ".git")
    console.log("📁 Initializing .git directory at", gitDir);

    // Ensure .git exists
    if (!fs.existsSync(gitDir)) {
      fs.mkdirSync(gitDir, { recursive: true });
    }

    // Create objects dir
    const objectsDir = path.join(gitDir, "objects");
    if (!fs.existsSync(objectsDir)) {
      fs.mkdirSync(objectsDir, { recursive: true });
    }

    // Create refs and refs/heads
    const refsDir = path.join(gitDir, "refs");
    const headsDir = path.join(refsDir, "heads");
    if (!fs.existsSync(refsDir)) {
      fs.mkdirSync(refsDir, { recursive: true });
    }
    if (!fs.existsSync(headsDir)) {
      fs.mkdirSync(headsDir, { recursive: true });
    }

    // Write HEAD file (always overwrite to ensure consistency)
    const headPath = path.join(gitDir, "HEAD");
    fs.writeFileSync(headPath, "ref: refs/heads/master\n", { encoding: "utf8" });

    console.log("✔ .git initialized with objects/, refs/, refs/heads/, and HEAD");
  }

  private async fetchRefs(): Promise<Record<string, string>> {
    const infoUrl = `${this.url}/info/refs?service=git-upload-pack`;
    console.log("🌐 Fetching refs from:", infoUrl);
    let text = '';

    try {
      const res = await fetch(infoUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/x-git-upload-pack-advertisement'
        }
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        console.error("Response not OK:", res.status, res.statusText);
        throw new Error(`Failed to fetch refs: ${res.status} ${res.statusText}`);
      }

      text = await res.text();
      console.log("📜 Raw response:", text);

    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
    const refs: Record<string, string> = {};
    const lines = text.split("\n");
    for (const line of lines) {
      const parts = line.trim().split("\t");
      if (parts.length === 2) {
        refs[parts[1]] = parts[0]; // branch → sha
      }
    }
    return refs;
  }

  private async fetchPack(wants: string[]): Promise<Uint8Array> {
    console.log("📦 Requesting pack for commits:", wants);

    // Git wants request (only first commit for now)
    const body = `0032want ${wants[0]} multi_ack_detailed side-band-64k thin-pack ofs-delta\n0009done\n`;

    const res = await fetch(`${this.url}/git-upload-pack`, {
      method: "POST",
      headers: { "Content-Type": "application/x-git-upload-pack-request" },
      body,
    });

    if (!res.ok) throw new Error(`Failed to fetch pack: ${res.status} ${res.statusText}`);

    const buffer = new Uint8Array(await res.arrayBuffer());
    return buffer;
  }

  private parsePack(packData: Uint8Array): void {
    const header = new TextDecoder().decode(packData.slice(0, 4));
    if (header !== "PACK") {
      console.error("❌ Invalid pack header:", header);
      return;
    }

    const version = new DataView(packData.buffer).getUint32(4, false);
    const numObjects = new DataView(packData.buffer).getUint32(8, false);
    console.log(`📦 Pack file version: ${version}, objects: ${numObjects}`);

    // Debug log: print first few bytes
    console.log("🔍 First 40 bytes:", packData.slice(0, 40));
  }
}