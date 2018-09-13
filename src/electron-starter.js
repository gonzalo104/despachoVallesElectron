const electron = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path          = require('path');
const url           = require('url');
const settings      = require('electron-settings');
const db            = require('./db/index');
const ipcMain       = require('./ipcmain/index')();

let mainWindow;

function createWindow() {

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes : true
    });
    
    mainWindow = new BrowserWindow({show: false});
    mainWindow.loadURL(startUrl);
    mainWindow.maximize();
    mainWindow.setMenu(null)
    mainWindow.show();
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

function createLogin() {
    let windowLogin = new BrowserWindow({width: 400, height: 500, center:true, resizable:false, 
                                     minimizable: false, maximizable: false, fullscreen: false,
                                     skipTaskbar: false, title      : 'Login'});

      const urlLogin = url.format({
        pathname: path.join(__dirname, '/../login/index.html'),
        protocol: 'file:',
        slashes : true
        });
        
      windowLogin.loadURL(urlLogin)

      windowLogin.on('closed', () => {
        windowLogin = null
      })

}


settings.delete('auth');

if(settings.has('auth')){
    app.on('ready', createWindow);
}else{
    app.on('ready', createLogin);
}


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

