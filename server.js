const folderService = require('./services/folderService');
const fileGenerator = require('./services/fileGenerator');
const fileWatcher = require('./middleware/fileWatcher');

const startServer = () => {
  folderService.createFolders();
  fileGenerator.startGenerating();
  fileWatcher.watchProcessingFolder();
};

startServer();
