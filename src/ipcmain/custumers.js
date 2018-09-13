
const db = require('./../db/index');

const Custumers = (ipcMain) => {    
    ipcMain.on('list-custumers', async (event, arg) => {    
       // db.Appointment.findAll().then(obj => { console.log(obj) }).catch(err => console.log("errores*******",err));
        let custumer = await db.Custumer.findAll({ include:[{model: db.Lawyer, required:true}]})
        event.sender.send('list-custumers-reply', custumer)
      })
}

module.exports = Custumers;