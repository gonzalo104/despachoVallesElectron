module.exports = (sequelize, Sequelize) => {

    const LawyerUser = sequelize.define('LawyerUser', {
      id: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
      },
      lawyer_id: {
          type     : Sequelize.INTEGER,
          allowNull: false,
      },
      user_id: {
        type     : Sequelize.INTEGER,
        allowNull: false,
    }          
    }
    );
   
    return LawyerUser; 
  
  };