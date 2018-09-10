module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('User', {
      id: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
      },
      name   : {
        type     : Sequelize.STRING,
        allowNull: false,
      }, 
      email  : {
          type     : Sequelize.STRING,
          allowNull: false,
      },
      username: {        
        type     : Sequelize.STRING,
        allowNull: false,
      }, 
      password: {          
          type     : Sequelize.STRING,
          allowNull: false,
      },
      rol: {
          type     : Sequelize.STRING,
          allowNull: false,
      },
    }
    );
   
    return User; 
  
  };
  