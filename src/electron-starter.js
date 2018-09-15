const electron = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path          = require('path');
const url           = require('url');
const settings      = require('electron-settings');
const db            = require('./db/index');
const ipc           = require('./ipcmain/index')();
const {ipcMain}     = require('electron');
const bcrypt        = require('bcrypt');

let mainWindow;
let windowLogin;

//createUsers()

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
        settings.delete('auth');
    })
}

function createLogin() {
     windowLogin = new BrowserWindow({width: 400, height: 500, center:true, resizable:false, 
                                     minimizable: false, maximizable: false, fullscreen: false,
                                     skipTaskbar: false, title      : 'Login'});

      const urlLogin = url.format({
        pathname: path.join(__dirname, '/../login/index.html'),
        protocol: 'file:',
        slashes : true
        });

      windowLogin.webContents.openDevTools();  
      windowLogin.loadURL(urlLogin)
      windowLogin.on('closed', () => {
        windowLogin = null
      })
      
      ipcMainLogin();
}

if(settings.has('auth')){
    app.on('ready', createWindow);
}else{
    app.on('ready', createLogin);
}


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
        settings.delete('auth');
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});



function ipcMainLogin(){
    ipcMain.on('loginMain', async (event, arg) => {  
        let isLogin  = false;
        let findUser = await db.sequelize.query(`SELECT * FROM Users Where username='${arg.username}' COLLATE Latin1_General_CS_AS_KS_WS  ORDER BY id OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY `,{ type: db.sequelize.QueryTypes.SELECT});
        if (findUser.length>0) {   
         if( !bcrypt.compareSync(arg.password, findUser[0].password)){
                isLogin = false;
           }else{
                isLogin = true;
                settings.set('auth', findUser[0]);
                console.log(settings.getAll())
           }                              
        }else{
            isLogin = false
        }
        event.sender.send('loginRender', {isLogin: isLogin})         
       });

       ipcMain.on('sendHome', (event, arg) => {           
            windowLogin.close(); 
            createWindow();           
       });


}   


 async function createUsers(){
   let user1 = await db.User.create({name    : 'Usuario Master',email   : 'master@example.com', username: 'MasterDes', password: bcrypt.hashSync('MasterGonGo', 10), rol     : 'Master'});
   if (user1) {
       console.log("guardo Correctamente")
   }

}

