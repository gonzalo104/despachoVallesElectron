
const db = require('./../db/index');

const Custumers = (ipcMain) => {    

    ipcMain.on('list-custumers', async (event, arg) => {    
       // db.Appointment.findAll().then(obj => { console.log(obj) }).catch(err => console.log("errores*******",err));
        let custumers = await db.Custumer.findAll({ include:[{model: db.Lawyer, required:true}]})
        let lawyers   = await db.Lawyer.findAll();
        event.sender.send('list-custumers-reply',{custumers, lawyers} )
      })

      ipcMain.on('saveEdit-custumer', async (event, arg) => {

        const {id, name, email, movil, phone, lawyer_id, type_custumer, comments, type} = arg;
        let   success                                                                   = false;
          if (type === 'new') {
            let saveCustumer = await db.Custumer.create({id,name,email, movil,phone,lawyer_id,type_custumer,comments})
                success      = !saveCustumer ? false : true;
                custumer     = saveCustumer;
          }else{
            let updateCustumer = await db.Custumer.update({name,email, movil,phone,lawyer_id,type_custumer,comments}, {where: {id: id}});
                success        = !updateCustumer ? false : true;
                custumer       = updateCustumer;
          }          
          let custumers = await getAllCustumers();
          event.sender.send('saveEdit-custumer-reply', {success,custumers});

      });
}


const getAllCustumers = async() => {
  return custumer = await db.Custumer.findAll({ include:[{model: db.Lawyer, required:true}]})

}

module.exports = Custumers;