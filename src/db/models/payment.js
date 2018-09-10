module.exports = (sequelize, Sequelize) => {

    const Payment = sequelize.define('Payment', {
      id: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
      },
      casefile_id: {
          type     : Sequelize.INTEGER,
          allowNull: false,
      },
      payment: {
          type     : Sequelize.DECIMAL(10, 2),
          allowNull: false,
      },
      type_payment: {
          type     : Sequelize.STRING,
          allowNull: false,
      }
    }
    );
   
    return Payment; 
  
  };
  
  
   