module.exports = (sequelize, Sequelize) => {

  const Appointment = sequelize.define('Appointment', {
    id: {
      type         : Sequelize.INTEGER,
      primaryKey   : true,
      autoIncrement: true,
    },
    date_appointment: {
      type     : Sequelize.DATE,
      allowNull: false,
    },
    custumer_id: {
      type     : Sequelize.INTEGER,
      allowNull: false,

    },
    lawyer_id:{
      type     : Sequelize.INTEGER,
      allowNull: false,
    },
    comments   : {
      type        : Sequelize.STRING,
      allowNull   : true,
      defaultValue: null,
    }
  }
  );
 
  return Appointment; 

};


 