module.exports = (sequelize, Sequelize) => {

  const Appointment = sequelize.define('Appointment', {
    id: {
      type         : Sequelize.INTEGER,
      primaryKey   : true,
      autoIncrement: true,
    },
    date_appountment: Sequelize.DATE,
    custumer_id     : Sequelize.INTEGER,
    comments        : Sequelize.STRING,
  }
  );
 
  return Appointment; 

};


 