"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Recruitments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      companyName: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      area: {
        type: Sequelize.STRING,
      },
      position: {
        type: Sequelize.STRING,
      },
      compensation: {
        type: Sequelize.STRING,
      },
      skill: {
        type: Sequelize.STRING,
      },
      detail: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Recruitments");
  },
};
