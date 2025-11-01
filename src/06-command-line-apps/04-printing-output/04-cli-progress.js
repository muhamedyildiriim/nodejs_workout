/**
 * Topic: Node.js CLI Utilities → figlet + chalk + ora + cli-progress (Interactive CLI Experience)
 * Purpose: Demonstrates how to combine multiple Node.js CLI utilities to create a fully interactive terminal experience with banners, spinners, and progress bars.
 * Key Points:
 *  - figlet: generates ASCII-art banners for headers or welcome screens.
 *  - chalk: adds color and style to terminal output.
 *  - ora: provides elegant loading spinners for asynchronous tasks.
 *  - cli-progress: displays customizable progress bars with percentage and ETA.
 *  - Combined, they can simulate real-time CLI workflows (e.g., installation, setup, builds).
 * Run: node src/06-command-line-apps/04-printing-output/04-cli-progress.js
 * Expected:
 *  - Displays a yellow ASCII banner (“My CLI Tool”).
 *  - Shows a cyan spinner labeled “Initializing...”.
 *  - After 1.5 seconds, spinner completes → progress bar starts filling.
 *  - Finishes with a “✨ All done!” message.
 */

import chalk from 'chalk';
import figlet from 'figlet';
import cliProgress from 'cli-progress';
import ora from 'ora';

// === ASCII Banner ===
console.log(chalk.yellow(figlet.textSync('My CLI Tool', { font: 'Slant' })));

// === Loading Spinner ===
const spinner = ora(chalk.cyan('Initializing...')).start();

setTimeout(() => {
  spinner.succeed('Initialization complete!');
  
  // === Progress Bar ===
  const bar = new cliProgress.SingleBar(
    {
      format: chalk.green('{bar}') + ' {percentage}% | ETA: {eta_formatted}',
    },
    cliProgress.Presets.shades_classic
  );

  bar.start(100, 0);
  let val = 0;

  const timer = setInterval(() => {
    bar.update(++val);

    if (val >= 100) {
      clearInterval(timer);
      bar.stop();
      console.log(chalk.magenta('\n✨ All done!'));
    }
  }, 40);
}, 1500);