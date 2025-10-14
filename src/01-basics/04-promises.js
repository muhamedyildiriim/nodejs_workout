/**
 * File: 01-basics/04-promises.js
 * Topic: Promises and Async/Await
 * Purpose: Demonstrate how JavaScript handles asynchronous operations using Promises.
 * Key Points:
 *  - A Promise represents a value that will be available in the future.
 *  - Has 3 states: Pending → Fulfilled → Rejected.
 *  - `then()` handles success, `catch()` handles failure.
 *  - Async/Await is syntactic sugar for Promises, making async code more readable.
 *  - Promises prevent callback hell and enable structured async workflows.
 * Run: node src/01-basics/04-promises.js
 * Expected:
 *  - Logs: "Task completed", "Setting the table...", "Meal is ready!", "Pizza delivered!"
 */

// PROMISES
// A Promise = A promise to do something later.
// JavaScript says I can’t finish this right now, but I promise — I’ll either succeed or fail.
// So Promise = a future result.

/*
3 States of a Promise
- Pending → Still working
- Fulfilled → Finished successfully (resolve)
- Rejected → Failed (reject)
*/

export function runBasicPromiseDemo() {
  const promise = new Promise((resolve, reject) => {
    let isDone = true;

    if (isDone) {
      resolve("Task completed");
    } else {
      reject("Something went wrong");
    }
  });

  promise
    .then((result) => console.log(result))   // success
    .catch((error) => console.log(error));   // error
  // Do this job. When it’s finished, tell me if it worked (then) or failed (catch).
}

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

function orderFood(item) {
  return new Promise((resolve, reject) => {
    if (item === "pizza") {
      resolve("Pizza delivered!");
    } else {
      reject("Item not available!");
    }
  });
}

export async function runPromiseUseCases() {
  // Example 1: cookMeal
  cookMeal().then((message) => console.log(message));
  console.log("Setting the table...");
  // Promises don’t block the rest of the code — other tasks keep running.

  // Example 2: orderFood
  orderFood("pizza")
    .then((msg) => console.log(msg))
    .catch((err) => console.log(err));
  // If item is "pizza", → resolve; else → reject

  // SUMMARY
  // resolve -> Operation succeeded -> resolve("Done!")
  // reject -> Operation failed -> reject("Error!")
  // .then() -> Runs when success -> .then(result => ...)
  // .catch() -> Runs when error -> .catch(err => ...)
  // await -> Waits for the Promise -> const x = await getData()
  // async -> Makes a function return a Promise -> async function foo() {}
}