module.exports = (sequelize, Sequelize) => {

    const Lawyer = sequelize.define('Lawyer', {
      id: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
      },
      name: {
          type     : Sequelize.STRING,
          allowNull: false,
      },
      rfc: {
        type        : Sequelize.STRING,
        allowNull   : true,
        defaultValue: null,
      },
      address: {
          type        : Sequelize.TEXT,
          allowNull   : true,
          defaultValue: null,
      },
      professionalCar: {
          type        : Sequelize.STRING,
          allowNull   : true,
          defaultValue: null,
      }      
    }
    );
   
    return Lawyer; 
  
  };
  
  
   