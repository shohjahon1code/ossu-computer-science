// scripts/update-progress.js

const fs = require("fs");
const path = require("path");

const README_PATH = path.join(__dirname, "..", "README.md");

// Read README
let content = fs.readFileSync(README_PATH, "utf8");

// Count ✅ completed courses
const completed = (content.match(/✅/g) || []).length;

// Count all course rows (each course link row has a | [Course])
const total = (content.match(/\| \[.+?\]\(/g) || []).length;

// Calculate %
const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

// Replace badge line
content = content.replace(
  /!\[Progress\]\(https:\/\/progress-bar\.dev\/\d+\/\?title=Overall\+Progress.*?\)/,
  `![Progress](https://progress-bar.dev/${percent}/?title=Overall+Progress&width=300)`
);

// Write back to README
fs.writeFileSync(README_PATH, content);

console.log(
  `✅ Progress badge updated: ${percent}% complete (${completed}/${total} courses)`
);
