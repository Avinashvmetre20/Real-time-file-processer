const fs = require('fs');
const path = require('path');

const folders = ['Processing', 'In-Progress', 'Completed', 'Crashed', 'logs'];

exports.createFolders = () => {
  folders.forEach(folder => {
    const fullPath = path.join(__dirname, '..', folder);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath);
    }
  });

  const logFile = path.join(__dirname, '..', 'logs', 'activity.log');
  if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, '');
  }
};
