import chalk from 'chalk';

function showMessage() {
  console.log(
    chalk.blue.bgYellow.bold("Hello from Chalk!") +
    " " +
    chalk.green.italic("This is a colorful message.")
  );
}

export default showMessage;
