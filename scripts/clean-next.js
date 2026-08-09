const fs = require('fs');
const path = require('path');

const targets = ['.next', path.join('node_modules', '.cache')];

for (const target of targets) {
  try {
    fs.rmSync(target, { recursive: true, force: true });
    console.log(`Removed ${target}`);
  } catch (error) {
    console.warn(`Could not remove ${target}:`, error.message);
  }
}
