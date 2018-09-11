const Sequelize = require('sequelize');

const sequelize = new Sequelize('despacho', 'sa', 'gonzalozame04', {
  //host            : 'DESKTOP-HTB2RFD',
  host            : 'localhost',
  dialect         : 'mssql',
  operatorsAliases: false,
  /*dialectOptions: {
    encrypt       : true,
    instanceName  : 'SQLEXPRESS',
    requestTimeout: 30000
  },*/

  pool: {
    max    : 5,
    min    : 0,
    acquire: 30000,
    idle   : 10000
  },  
});

const db           = {};
      db.Sequelize = Sequelize;
      db.sequelize = sequelize;


db.User        = require('./models/user')(sequelize, Sequelize);
db.Lawyer      = require('./models/lawyer')(sequelize, Sequelize);
db.LawyerUser  = require('./models/lawyers_user')(sequelize, Sequelize);
db.Custumer    = require('./models/custumer')(sequelize, Sequelize);
db.CaseFile    = require('./models/case_file')(sequelize, Sequelize);
db.Update      = require('./models/update')(sequelize, Sequelize);
db.Payment     = require('./models/payment')(sequelize, Sequelize);
db.Appointment = require('./models/appointment')(sequelize, Sequelize);

db.LawyerUser.belongsTo(db.Lawyer, {foreignKey: 'lawyer_id'});
db.User.hasMany(db.LawyerUser, {foreignKey: 'user_id'});
db.LawyerUser.belongsTo(db.User, {foreignKey: 'user_id'});
db.Custumer.belongsTo(db.Lawyer, {foreignKey: 'lawyer_id'});
db.CaseFile.belongsTo(db.Lawyer), {foreignKey: 'lawyer_id'};
db.Update.belongsTo(db.CaseFile, {foreignKey: 'case_file_id'});
db.CaseFile.hasMany(db.Update, {foreignKey: 'case_file_id'});
db.CaseFile.hasMany(db.Payment, {foreignKey: 'casefile_id'});
db.Payment.belongsTo(db.CaseFile, {foreignKey: 'casefile_id'});
db.Appointment.belongsTo(db.Custumer, {foreignKey: 'custumer_id'});
db.Appointment.belongsTo(db.Lawyer, {foreignKey: 'lawyer_id'});

//sequelize.sync().then(() => console.log("**************** Funcionó correctamente la sincronización *********************** \n Ha trabajar!!!")).catch((err) => console.log("*****************+*** ERROR **************************: \n",err));

module.exports = db;