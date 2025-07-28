import * as fs from 'fs';
import { GitClient } from "./git"
import { CatFileCommand, Commands, HashObjectCommand } from './git/commands';
import path from 'path';

const args = process.argv.slice(2);
const command = args[0];
const gitClient = new GitClient();

if (Commands.Init === command) {
    gitClient.init();
    process.exit();
}

if (!fs.existsSync(path.join(process.cwd(), ".git"))) {
    process.stdout.write("git not initialize yet!");
    process.exit();
}

switch (command) {
    case Commands.CatFile:
        gitClient.run(new CatFileCommand(process.argv[3], process.argv[4]));
        break;
    case Commands.HashObject:
        gitClient.hash(new HashObjectCommand(process.argv[3], process.argv[4]));
        break;
    default:
        process.stdout.write(`Unknown command ${command}`);
}