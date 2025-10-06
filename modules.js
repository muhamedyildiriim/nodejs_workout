//ESM vs CommonJS
// import
// CJS: const chalk = require("chalk");
// ESM: import chalk from "chalk";

// export
// CJS: exports.something = ...
// ESM: export function ... or export const ...

// SETTINGS
// ESM: In package.json → "type": "module" or use the '.mjs' file extension


//===========================
// COMMONJS VERSIONS
//===========================

//EXPORTING YOUR OWN CODE
//logger.js
const chalk = require("chalk");
exports.logInfo = function (message) {
    console.log(chalk.blue(message));
};
exports.logError = function logError(message) {
    console.log(chalk.red(message));
};
exports.defaultMessage = "Hello World";
// index.js
const logger = require("./logger");
logger.logInfo(`${logger.defaultMessage} printed in blue`);
logger.logError("some error message printed in red");



// The exports object is read-only, which means it will always remain the same object instance and cannot be overwritten. However, it is only a shortcut to the exports property of the module object. We could rewrite our logger module like this:

//logger.js
function info(message) {
    console.log(chalk.blue(message));
}
function error(message) {
    console.log(chalk.red(message));
}
const defaultMessage = "Hello World";
module.exports = {
    logInfo: info,
    logError: error,
    defaultMessage,
};

//IMPORTING ONLY SPECIFIC
const { logError: cjsLogError } = require("./logger");

//EXPORTING NOT ONLY OBJECTS
// logger.js
class Logger {
  static defaultMessage = "Hello World";
  static info(message) {
    console.log(chalk.blue(message));
  }
  static error(message) {
    console.log(chalk.red(message));
  }
}
module.exports = Logger;
// index.js
const Logger = require("./logger");
Logger.info(`${logger.defaultMessage} printed in blue`);
Logger.error("some error message printed in red");



//===========================
// ECMASCRIPT MODULE (ESM) VERSIONS
//===========================

//EXPORTING YOUR OWN CODE
import chalk from "chalk";
export function logInfo(message) {
    console.log(chalk.blue(message));
}
export function logError(message) {
    console.log(chalk.red(message));
}
export const myDefaultMessage = "Hello World";
// app.mjs
import logger from "./logger.js";
logInfo(`${myDefaultMessage} printed in blue`);
logError("some error message printed in red");



// The exports object is read-only, which means it will always remain the same object instance and cannot be overwritten. However, it is only a shortcut to the exports property of the module object. We could rewrite our logger module like this:

function infoESM(message) {
    console.log(chalk.blue(message));
}
function errorESM(message) {
    console.log(chalk.red(message));
}
export const oneDefaultMessage = "Hello World";
export { infoESM as logInfo, errorESM as logError };

//IMPORTING ONLY SPECIFIC
import { logError as esmLogError } from "./logger.js";

//EXPORTING NOT ONLY OBJECTS
// logger.js (ESM)
export default class LoggerESM {
  static defaultMessage = "Hello World";
  static info(message) {
    console.log(chalk.blue(message));
  }
  static error(message) {
    console.log(chalk.red(message));
  }
}
// app.mjs
import LoggerESM from "./logger.js";
LoggerESM.info("bilgi mesajı");
LoggerESM.error("hata mesajı");
console.log(LoggerESM.defaultMessage);

// logger.mjs (ESM)
import chalk from "chalk";
export class Logger {
  static defaultMessage = "Hello World";
  static info(message) {
    console.log(chalk.blue(message));
  }
  static error(message) {
    console.log(chalk.red(message));
  }
}
// app.mjs
import { Logger } from "./logger.mjs";
Logger.info(`${Logger.defaultMessage} printed in blue`);
Logger.error("some error message printed in red");


//EXPORTS vs DEFAULT EXPORT 
// export default class ... -> import ... from '..(.mjs)';
// export class ... -> import { ... } from './..(.mjs)';

//If we put the default keyword behind any export, we basically say “treat this as the thing every module gets, if it doesn’t ask for something specific”. We can (but are not forced to) import it by leaving out the curly brackets