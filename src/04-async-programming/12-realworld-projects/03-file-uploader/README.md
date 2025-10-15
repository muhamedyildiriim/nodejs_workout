# File Uploader (Stream Simulation)

## Overview
Simulates a file upload using **Node.js streams** and `stream/promises` `pipeline` for backpressure-aware transfer.

## 🔧 Files
| File | Purpose |
|------|--------|
| `file-uploader.js` | Copies a file into `uploads/` using streams to mimic an upload |
| `uploads/` | Output directory (can be ignored in Git) |

## 🚀 How to Run
```bash
# make sure you have a sample file
echo "hello" > data/sample.txt
node src/04-async-programming/12-realworld-projects/03-file-uploader/file-uploader.js
```