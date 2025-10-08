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


//PROMISES
// A Promise = A promise to do something later.
// JavaScript says I can’t finish this right now, but I promise — I’ll either succeed or fail.
// So Promise = a future result.
/*
3 States of a Promise
- Pending → Still working
- Fulfilled → Finished successfully (resolve)
- Rejected → Failed (reject)
*/

const promise = new Promise((resolve, reject) => {
  let isDone = true;

  if (isDone) {
    resolve("Task completed ✅");
  } else {
    reject("Something went wrong ❌");
  }
});

promise
  .then((result) => console.log(result))   // success
  .catch((error) => console.log(error));   // error
// Do this job. When it’s finished, tell me if it worked (then) or failed (catch).

/*
Why do we need Promises?

Because some tasks take time:
* Reading a file
* Calling an API
* Querying a database

JavaScript runs line by line, and doesn’t wait
so we use Promises to handle delayed results.
*/

function cookMeal() {
  return new Promise((resolve) => {
    console.log("Cooking the meal...");
    setTimeout(() => {
      resolve("Meal is ready!");
    }, 2000);
  });
}
cookMeal().then((message) => console.log(message));
console.log("Setting the table...");
// So Promises don’t block the rest of the code — other tasks keep running.

function orderFood(item) {
  return new Promise((resolve, reject) => {
    if (item === "pizza") {
      resolve("Pizza delivered!");
    } else {
      reject("Item not available!");
    }
  });
}
orderFood("pizza")
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));
// If item is "pizza", → resolve
// Else → reject


//SUMMARY
// resolve -> Operation succeeded -> resolve("Done!")
// reject -> Operation failed -> reject("Error!")
// .then() -> Runs when success -> .then(result => ...)
// .catch() -> Runs when error -> .catch(err => ...)
// await -> Waits for the Promise -> const x = await getData()
// async -> Makes a function return a Promise -> async function foo() {}