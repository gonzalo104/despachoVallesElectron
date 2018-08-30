const electron = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path          = require('path');
const url           = require('url');

let mainWindow;

function createWindow() {

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes : true
    });
    
    mainWindow = new BrowserWindow({width: 900, height: 600});
    //mainWindow.loadURL('http://localhost:3000');
    mainWindow.loadURL(startUrl);
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
  
    if (mainWindow === null) {
        createWindow()
    }
});