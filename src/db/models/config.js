const Sequelize = require('sequelize');
const sequelize = new Sequelize('despachovalles', 'sa', 'gonzalozame04', {
  host            : ' ',
  dialect         : 'mssql',
  operatorsAliases: false,
  dialectOptions: {
    encrypt: true,
    instanceName: 'SQLEXPRESS',
    requestTimeout: 30000 
  },

  pool: {
    max    : 5,
    min    : 0,
    acquire: 30000,
    idle   : 10000
  },  
});


const config = () => {
    sequelize.authenticate().then(() => { console.log("Estas conectado men xD!")}).catch(err => {
       console.log("no pudiste conectarte :(", err)})
    return sequelize;
}

module.exports = config();