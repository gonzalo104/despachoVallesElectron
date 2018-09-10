module.exports = (sequelize, Sequelize) => {

    const Custumer = sequelize.define('Custumer', {
      id: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
      },
      name: {
        type     : Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type        : Sequelize.STRING,
        allowNull   : true,
        defaultValue: null,
      },
      movil: {
        type        : Sequelize.STRING,
        allowNull   : true,
        defaultValue: null,
      },
      email: {
          type        : Sequelize.STRING,
          allowNull   : true,
          defaultValue: null,
      },
      comments: {
          type        : Sequelize.TEXT,
          allowNull   : true,
          defaultValue: null,
      },
      lawyer_id:{
          type     : Sequelize.INTEGER,
          allowNull: false,
      },
      type_custumer: {
          type     : Sequelize.STRING,
          allowNull: false,
      }
    }
    );
   
    return Custumer; 
  
  };
  