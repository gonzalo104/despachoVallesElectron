const {ipcMain} = require('electron');
const custumers    = require('./custumers');
const appointments = require('./appointments');
const users        = require('./users');

    module.exports = () => {
      custumers(ipcMain);
      appointments(ipcMain);
      users(ipcMain);


}

