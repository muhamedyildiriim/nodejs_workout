/**
 * Topic: Async Programming → Real-world Scenarios → Concurrent API Requests
 * Purpose: Demonstrates aggregating multiple async operations concurrently and handling failures gracefully.
 * Key Points:
 *  - Use Promise.all to run independent HTTP requests in parallel
 *  - Validate each response; short-circuit on failures
 *  - Consider Promise.allSettled for partial results in dashboards
 * Run: node src/04-async-programming/12-realworld-projects/04-concurrent-requests/concurrent-requests.js
 * Expected:
 *  - Prints a compact table of selected GitHub user fields or a clear error if any request fails
 */

const urls = [
  "https://api.github.com/users/octocat",
  "https://api.github.com/users/torvalds",
  "https://api.github.com/users/gaearon",
];

async function fetchUsers() {
  try {
    console.log("👥 Fetching GitHub users concurrently...");
    const responses = await Promise.all(urls.map((u) => fetch(u)));
    responses.forEach((r, i) => {
      if (!r.ok) {
        throw new Error(`HTTP ${r.status} at ${urls[i]}`);
      }
    });
    const data = await Promise.all(responses.map((r) => r.json()));
    const rows = data.map((u) => ({ login: u.login, id: u.id, followers: u.followers }));
    console.table(rows);
  } catch (err) {
    console.error("Concurrent fetch failed:", err.message);
  }
}

fetchUsers();