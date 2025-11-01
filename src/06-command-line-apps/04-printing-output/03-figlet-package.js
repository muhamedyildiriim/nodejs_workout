/**
 * Topic: Node.js CLI Utilities → figlet + chalk + chalk-animation (ASCII Banners & Styling)
 * Purpose: Demonstrates how to create stylish ASCII-art banners and colorful animated CLI headers using figlet, chalk, and chalk-animation.
 * Key Points:
 *  - figlet: generates large ASCII text banners from regular strings.
 *  - chalk: styles text with colors, backgrounds, and emphasis.
 *  - chalk-animation: adds smooth color animation effects (e.g. rainbow, pulse).
 *  - figlet supports multiple fonts (e.g., Standard, Slant, Big, Ghost, Doom).
 *  - Ideal for building CLI intros, welcome screens, or setup wizards.
 * Run: node src/06-command-line-apps/04-printing-output/03-figlet-package.js
 * Expected:
 *  - Prints multiple styled ASCII banners in the terminal.
 *  - Shows a rainbow-animated text for 3 seconds.
 *  - Displays a simulated “Server started” message.
 */

import figlet from 'figlet';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

// === Basic ASCII banners ===
figlet('Hello World!', (err, data) => {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data);
});

// Colored banner using chalk
figlet('WELCOME!', (err, data) => {
  console.log(chalk.cyan(data));
});

// Inline synchronous banner with background
console.log(chalk.bgBlue.white.bold(figlet.textSync('APP STARTED')));

// === Using custom figlet fonts ===
const banner = figlet.textSync('Node CLI', {
  font: 'Slant',
  horizontalLayout: 'default',
  verticalLayout: 'default',
});
console.log(banner);

// Write directly to stdout
const banner2 = figlet.textSync('My App', { font: 'Standard' });
process.stdout.write(chalk.greenBright(banner2));

// === Reusable startup banner function ===
function startupBanner(appName) {
  const text = figlet.textSync(appName, { font: 'Slant' });
  console.log(chalk.yellow.bold(text));
  console.log(chalk.gray('--------------------------------------'));
  console.log(chalk.green('Server running on port 8080 🚀'));
}

startupBanner('MyApp');

// === Animated banner example ===
const msg = figlet.textSync('HELLO!', { font: 'Big' });
const rainbow = chalkAnimation.rainbow(msg);

setTimeout(() => {
  rainbow.stop(); // stop animation after a few seconds
}, 3000);