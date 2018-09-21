const {ipcMain} = require('electron');
const custumers      = require('./custumers');
const appointments   = require('./appointments');
      module.exports = () => {
    custumers(ipcMain);
    appointments(ipcMain);
}

