import arg from 'arg';
import inquirer from 'inquirer';
import { createJSNetServer } from './main';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg({
        "--yes": Boolean,
        "--install": Boolean,
        "-i": "--install",
        "-y": "--yes"
    }, {
        argv: rawArgs.slice(2)
    })
    return {
        skipPrompts: args['--yes'] || false,
        application: args._[0],
        template: args._[1],
        runInstall: args['--install'] || false
    }
}

async function promptForMissingOptions(options) {
    const defaultTemplate = "Javascript";
    const defaultApplication = "JSNet.Framework"
    if (options.skipPrompts) {
        return {
            ...options,
            application: options.application || defaultApplication,
            template: options.template || defaultTemplate

        }
    }
    const questions = new Array();
    if (!options.application) {
        questions.push({
            type: "list",
            name: "application",
            message: "Please choose which application you want to build",
            choices: ["JSNet.Framework", "JSNet.Api"],
            default: defaultApplication
        })
    }

    if (!options.template) {
        questions.push({
            type: "list",
            name: "template",
            message: 'Please choose which server to use',
            choices: ["Javascript", "Typescript"],
            default: defaultTemplate
        });
    }


    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        application: options.application || answers.application,
        template: options.template || answers.template

    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await createJSNetServer(options);
}