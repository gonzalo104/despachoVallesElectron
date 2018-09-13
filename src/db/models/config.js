const Sequelize = require('sequelize');

const sequelize = new Sequelize('despachovalles', 'sa', 'gonzalozame04', {
  host            : 'DESKTOP-HTB2RFD',
  dialect         : 'mssql',
  operatorsAliases: false,
  dialectOptions  : {
    encrypt       : true,
    instanceName  : 'SQLEXPRESS',
    requestTimeout: 30000
  },

  pool: {
    max    : 5,
    min    : 0,
    acquire: 30000,
    idle   : 10000
  },

});

module.exports = sequelize;