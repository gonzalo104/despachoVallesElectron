const {ipcMain} = require('electron');
const custumers = require('./custumers');

module.exports  = () => {
    custumers(ipcMain);

}

