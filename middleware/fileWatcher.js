const fs = require('fs');
const path = require('path');
const fileController = require('../controllers/fileController');

const PROCESSING = path.join(__dirname, '..', 'Processing');

exports.watchProcessingFolder = () => {
  fs.watch(PROCESSING, (eventType, filename) => {
    if (eventType === 'rename' && filename) {
      const filePath = path.join(PROCESSING, filename);
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
          fileController.processFile(filePath);
        }
      });
    }
  });
};
