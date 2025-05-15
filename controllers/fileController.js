const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const logger = require('../services/loggerService');

const IN_PROGRESS = path.join(__dirname, '..', 'In-Progress');
const COMPLETED = path.join(__dirname, '..', 'Completed');
const CRASHED = path.join(__dirname, '..', 'Crashed');

exports.processFile = (filePath) => {
  const fileName = path.basename(filePath);
  const inProgressPath = path.join(IN_PROGRESS, fileName);
  const startTime = Date.now();

  fs.rename(filePath, inProgressPath, (err) => {
    if (err) return logger.error(`Error moving ${fileName} to In-Progress: ${err.message}`);

    logger.info(`${fileName} moved to In-Progress`);

    const delay = crypto.randomInt(1000, 6001);

    setTimeout(() => {
      const elapsed = (Date.now() - startTime) / 1000;

      if (elapsed > 3 && elapsed < 5) {
        logger.warn(`${fileName} has been in In-Progress for more than 3 seconds`);
      }

      if (elapsed >= 5) {
        const crashPath = path.join(CRASHED, fileName);
        fs.rename(inProgressPath, crashPath, (err) => {
          if (!err) {
            logger.error(`${fileName} crashed after ${elapsed.toFixed(2)}s`);
          }
        });
      } else {
        const completedPath = path.join(COMPLETED, fileName);
        fs.rename(inProgressPath, completedPath, (err) => {
          if (!err) {
            logger.info(`${fileName} completed in ${elapsed.toFixed(2)}s`);
          }
        });
      }
    }, delay);
  });
};
