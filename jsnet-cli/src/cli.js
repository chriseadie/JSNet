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
        template: args._[0],
        runInstall: args['--install'] || false
    }
}

async function promptForMissingOptions(options) {
    const defaultTemplate = "Javascript";
    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate
        }
    }

    const questions = new Array();
    if (!options.template) {
        questions.push({
            type: "list",
            name: "template",
            message: 'Please choose which server to use',
            choices: ["Javascript"],
            default: defaultTemplate
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        template: options.template || answers.template
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await createJSNetServer(options);
}