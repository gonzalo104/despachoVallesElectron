const Sequelize = require('sequelize');
const sequelize = new Sequelize('despachovalles', 'sa', 'gonzalozame04', {
  host            : 'localhost',
  dialect         : 'mssql',
  operatorsAliases: false,

  pool: {
    max    : 5,
    min    : 0,
    acquire: 30000,
    idle   : 10000
  },  
});


const config = () => {
    sequelize.authenticate().then(() => { console.log("Estas conectado men xD!")}).catch(err => { console.log("no pudiste conectarte :(")})
    return sequelize;
}

module.exports = config();