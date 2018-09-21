const db = require('./../db/index');

const Appointments = (ipcMain) => {


    ipcMain.on('list-appointments', async(event, arg) => {                
            let appointments      = await db.Appointment.findAll({ where:{date_appointment: arg.date},include : [{model: db.Lawyer, required:true},{model:db.Custumer, required:true}],});
                event.returnValue = {appointments};
    });

}

module.exports = Appointments;