const Sequelize = require('sequelize');
const sequelize = require('./config');

const Appointment = sequelize.define('Appointment', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date_appountment: Sequelize.DATE,
    custumer_id: Sequelize.INTEGER,
    comments: Sequelize.STRING,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  },{
    tableName: 'appointment',
    timestamps: false,
    underscored: true,
  });
 
  module.exports = Appointment;