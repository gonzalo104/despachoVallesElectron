module.exports = (sequelize, Sequelize) => {

    const File = sequelize.define('File', {
      id: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
      },
      file_type: {
		type     : Sequelize.STRING,
		allowNull: false
       },
        file: {
		type: Sequelize.BLOB('long')
        },
        file_size: {
		type: Sequelize.INTEGER
	    },
	    file_name: {
		type: Sequelize.STRING
	    }    
    }
    );
   
    return File; 
  
  };
  