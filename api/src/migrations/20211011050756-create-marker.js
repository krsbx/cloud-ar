module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Markers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      width: {
        type: Sequelize.INTEGER,
      },
      marker: {
        type: Sequelize.STRING,
      },
      metadata: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Markers');
  },
};
