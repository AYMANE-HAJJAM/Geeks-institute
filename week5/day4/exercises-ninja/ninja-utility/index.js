#!/usr/bin/env node
import { Command } from "commander";
import { greet } from "./commands/greet.js";
import { readFile } from "./commands/read.js";
import { fetchData } from "./commands/fetch.js";

const program = new Command();

program
    .name("ninja-utility")
    .description("A CLI utility for various tasks")
    .version("1.0.0")
    .showHelpAfterError()
    .showSuggestionAfterError();

program
    .command("greet")
    .description("Show colorful greeting message")
    .option("-n, --name <name>", "Specify a name", "Ninja")
    .action(function (...args) {
        // Commander v12 passes options as the last argument
        const options = args[args.length - 1];
        greet(options.name);
    });

// fetch command
program
    .command("fetch")
    .description("Fetch data from a URL")
    .option("-u, --url <url>", "API URL", "https://jsonplaceholder.typicode.com/posts/1")
    .action((options) => {
        fetchData(options.url);
    });

// read command
program
    .command("read <file>")
    .description("Read and display file content")
    .action((file) => {
        readFile(file);
    });

// Show help if no command is provided
if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(0);
}

program.parse(process.argv);
