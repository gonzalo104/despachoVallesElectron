
const db = require('./../db/index');

const Custumers = (ipcMain) => {    

    ipcMain.on('list-custumers', async (event, arg) => {       
       
        let   lawyers = await db.Lawyer.findAll();
        const options = {        
          page    : arg.page,
          paginate: arg.paginate,
          include : [{model: db.Lawyer, required:true}],
        }
        let pagination = await db.Custumer.paginate(options);
        event.sender.send('list-custumers-reply',{lawyers, pagination} )
      })

      ipcMain.on('saveEdit-custumer', async (event, arg) => {

        const {id, name, email, movil, phone, lawyer_id, type_custumer, comments, type ,page, paginate} = arg;
        let   success                                                                                   = false;
          if (type === 'new') {
            let saveCustumer = await db.Custumer.create({id,name,email, movil,phone,lawyer_id,type_custumer,comments})
                success      = !saveCustumer ? false : true;
                custumer     = saveCustumer;
          }else{
            let updateCustumer = await db.Custumer.update({name,email, movil,phone,lawyer_id,type_custumer,comments}, {where: {id: id}});
                success        = !updateCustumer ? false : true;
                custumer       = updateCustumer;
          }          
          let custumers = await getAllCustumers(page, paginate);
          event.sender.send('saveEdit-custumer-reply', {success,custumers});

      });

      ipcMain.on('pagination-custumers', async (envent, arg) => {          
          let custumers = await getAllCustumers(arg.page, arg.paginate);
          console.log("************", custumers);
          envent.sender.send('pagination-custumers-reply', {custumers: custumers});

      });


}


const getAllCustumers = async(page,paginate) => {
  const options = {        
    page,
    paginate,
    include: [{model: db.Lawyer, required:true}],
  }
  let pagination = await db.Custumer.paginate(options);
  return pagination;
}

module.exports = Custumers;