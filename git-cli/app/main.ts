import * as fs from 'fs';
import { Commands } from "./git"
import { CatFileCommand, CommitTreeCommand, exit, gitClient, HashObjectCommand, LsTreeCommand, UpdateIndexCommand, WriteTreeCommand } from './git/PlumbingCommands';
import path from 'path';
import { AddCommand, CommitCommand, StatusCommand } from './git/PorcelainCommands';
import { LogCommand } from './git/PorcelainCommands/log';

const args = process.argv.slice(2);
const command = args[0];

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
        gitClient.run(new HashObjectCommand(args[1], args[2]));
        break;
    case Commands.LsTree:
        gitClient.run(new LsTreeCommand(args[1], args[2]));
        break;
    case Commands.UpdateIndex:
        gitClient.run(new UpdateIndexCommand(args[1], args[2]));
        break;
    case Commands.WriteTree:
        gitClient.run(new WriteTreeCommand(process.cwd()));
        break;
    case Commands.CommitTree:
        gitClient.run(new CommitTreeCommand(args[2], args[4]));
        break;
    case Commands.GitAdd:
        gitClient.run(new AddCommand(args[1]));
        break;
    case Commands.GitStatus:
        gitClient.run(new StatusCommand());
        break;
    case Commands.Commit:
        gitClient.run(new CommitCommand(args[2]));
        break;
    case Commands.Log:
        gitClient.run(new LogCommand());
        break;
    default:
        exit(new Error(`Unknown command ${command}`));
}