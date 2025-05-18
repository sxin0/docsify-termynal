// run-all.js
const fs = require('fs');
const path = require('path');

function runJSFilesInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      runJSFilesInDir(fullPath);
    } else if (file.endsWith('.js')) {
      try {
        require(fullPath); // jalankan file
      } catch (e) {
        console.error(`Error in ${fullPath}:`, e.message);
      }
    }
  }
}

runJSFilesInDir(__dirname);
