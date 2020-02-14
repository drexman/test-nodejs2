'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('File_processes', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('completed', 'processing'),
        allowNull: false
      },
      
      count_pending : {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', ke: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('File_processes');
  }
};
