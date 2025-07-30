import * as fs from 'fs';
import { GitClient, Commands } from "./git"
import { CatFileCommand, HashObjectCommand, LsTreeCommand, UpdateIndexCommand, WriteTreeCommand } from './git/commands';
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
        gitClient.run(new CatFileCommand(args[1], args[2]));
        break;
    case Commands.HashObject:
        gitClient.hash(new HashObjectCommand(args[1], args[2]));
        break;
    case Commands.LsTree:
        gitClient.readTree(new LsTreeCommand(args[1], args[2]));
        break;
    case Commands.UpdateIndex:
        gitClient.updateIndex(new UpdateIndexCommand(args[1]));
        break;
    case Commands.WriteTree:
        gitClient.writeTree(new WriteTreeCommand(process.cwd()));
        break;
    default:
        process.stdout.write(`Unknown command ${command}`);
}        