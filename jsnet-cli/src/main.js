import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false
    });
}

export async function createJSNetServer(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd()
    };
    const currentFileUrl = import.meta.url;
    let templateDir;
    if (process.platform === "win32") {
        templateDir = path.resolve(
            decodeURI(new URL(currentFileUrl).pathname).substring(decodeURI(new URL(currentFileUrl).pathname).indexOf('/') + 1),
            `../../${options.application}/${options.template}/`);
    } else {
        templateDir = path.resolve(new URL(currentFileUrl).pathname,
            `../../${options.application}/${options.template}/`)
    }
    options.templateDirectory = templateDir;
    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error("%s Invalid template", chalk.red.bold("Error"))
        process.exit(1);
    }
    console.log("Copying Project Files");

    const tasks = new Listr([
        {
            title: "Copying sever files to directory",
            task: () => copyTemplateFiles(options)
        },
        {
            title: "Installing Server Dependencies",
            task: () => projectInstall({
                cwd: options.targetDirectory
            }),
            skip: () => !options.runInstall
                ? "Pass -i or --install to automatically install " : undefined,
        }
    ])
    await tasks.run()
    console.log("%s Server is ready", chalk.green.bold("DONE"))
    return true;
}