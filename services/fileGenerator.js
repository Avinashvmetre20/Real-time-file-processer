const fs = require('fs');
const path = require('path');

const PROCESSING = path.join(__dirname, '..', 'Processing');

function generateFile() {
  const fileName = `file_${Date.now()}.txt`;
  const filePath = path.join(PROCESSING, fileName);
  fs.writeFileSync(filePath, `Generated at ${new Date().toISOString()}`);
  scheduleNextFile();
}

function scheduleNextFile() {
  const start = Date.now();
  const delay = 3000;

  function loop() {
    if (Date.now() - start >= delay) {
      generateFile();
    } else {
      setImmediate(loop);
    }
  }

  loop();
}

exports.startGenerating = generateFile;
