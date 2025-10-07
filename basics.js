import fs from 'fs';

//EVENT LOOP (Event Loop, Non-blocking I/O, Modules)
// Single-threaded but asynchronous.
// JS executes the main task first, and when the call stack is empty, it runs the next task in the queue.
console.log("1");
setTimeout(() => console.log(2), 0);
console.log(3);
// Thanks to this mechanism, Node can handle thousands of requests simultaneously.

//Non-blocking I/O
// Instead of waiting for blocking tasks, move on to the next ones.
fs.readFile('file.txt', 'utf8', () => console.log('File has been read'));
console.log('I finished earlier!');
// Node’s strength comes from I/O, not CPU.

//MODULES (CommonJS & ESM)
// If your code isn’t modular, your project can’t scale.
// CommonJS → require
// ESM → import / "type": "module"
// Use ESM in new projects — CommonJS is older but still supported.