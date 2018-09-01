
const sequelize = require('sequelize');

const Appointment = sequelize.define('appointment', {
    id: {
      type: sequelize.INTEGER
    },
    date_appountment:{
        type: sequelize.DATE
    },
    custumer_id:{
        type: sequelize.INTEGER
    },
    comments:{
        type: sequelize.STRING
    },
    created_at:{
        type: sequelize.DATE
    },
    updated_at:{
        type: sequelize.DATE
    }
  });
  
  module.exports = Appointment;
 