const electron = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path          = require('path');
const url           = require('url');
const db            = require('./db/index');



let mainWindow;

//db.Appointment.findAll().then(obj => { console.log(obj) }).catch(err => console.log("errores*******",err));

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

