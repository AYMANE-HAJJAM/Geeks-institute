import chalk from "chalk";

export function greet(name = "Ninja") {
  console.log(chalk.green.bold(`Hello, ${name}! Welcome to the Ninja Utility.`));
}
