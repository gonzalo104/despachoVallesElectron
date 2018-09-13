module.exports = (sequelize, Sequelize) => {

    const CaseFile = sequelize.define('CaseFile', {
      id: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
      },
      type: {
          type     : Sequelize.STRING,
          allowNull: false,
      },
      lawyer_id: {
        type     : Sequelize.INTEGER,
        allowNull: false,
      },
      custumer_id: {
          type     : Sequelize.INTEGER,
          allowNull: false,
      },
      name_contrary: {
          type        : Sequelize.STRING,
          allowNull   : true,
          defaultValue: null,
      },
      lawyer_contrary: {
          type        : Sequelize.STRING,
          allowNull   : true,
          defaultValue: null,
      },
      affair_contrary: {
          type        : Sequelize.STRING,
          allowNull   : true,
          defaultValue: null,
      },
      court_contrary: {
          type        : Sequelize.STRING,
          allowNull   : true,
          defaultValue: null,
      },
      status: {
          type        : Sequelize.STRING,
          allowNull   : true,
          defaultValue: null,
      },
      no_case_file:{
          type        : Sequelize.STRING,
          allowNull   : true,
          defaultValue: null,
      },
      comments: {
          type        : Sequelize.STRING,
          allowNull   : true,
          defaultValue: null,
      },
      total: {
          type        : Sequelize.DECIMAL(10, 2),
          allowNull   : true,
          defaultValue: null,
      }

     
    }
    );
   
    return CaseFile; 
  
  };
  
  
   