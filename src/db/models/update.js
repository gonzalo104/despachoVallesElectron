module.exports = (sequelize, Sequelize) => {

    const Update = sequelize.define('Update', {
      id: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
      },
     case_file_id: {
         type     : Sequelize.INTEGER,
         allowNull: false,
     },
     description:{
         type        : Sequelize.TEXT,
         allowNull   : true,
         defaultValue: null,
     }     
    }
    );
   
    return Update; 
  
  };
  
  
   