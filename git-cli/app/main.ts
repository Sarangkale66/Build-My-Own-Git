import * as fs from 'fs';
import { GitClient, Commands } from "./git"
import { CatFileCommand, CommitTreeCommand, exit, HashObjectCommand, LsTreeCommand, UpdateIndexCommand, WriteTreeCommand } from './git/commands';
import path from 'path';

const args = process.argv.slice(2);
const command = args[0];
const gitClient = new GitClient();

if (Commands.Init === command) {
    gitClient.init();
    process.exit();
}

if (!fs.existsSync(path.join(process.cwd(), ".git"))) {
    exit(new Error("git not initialize yet!"));
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
        gitClient.updateIndex(new UpdateIndexCommand(args[1], args[2]));
        break;
    case Commands.WriteTree:
        gitClient.writeTree(new WriteTreeCommand(process.cwd()));
        break;
    case Commands.CommitTree:
        gitClient.commitTree(new CommitTreeCommand(args[2], args[4]));
        break;
    default:
        exit(new Error(`Unknown command ${command}`));
}