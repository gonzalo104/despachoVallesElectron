const db = require('./../db/index');

const Users = (ipcMain) => {


    ipcMain.on('list-users', async(event, arg) => {                
        const options = {        
            page    : 1,
            paginate: 25,
          }
          let users             = await db.User.paginate(options);
              event.returnValue = {users: users};
    });

}

module.exports = Users;