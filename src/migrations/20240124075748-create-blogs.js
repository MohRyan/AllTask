'use strict';

const {
  DataTypes
} = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectname: {
        type: Sequelize.STRING
      },
      datestarterror: {
        type: Sequelize.STRING
      },
      dateenderror: {
        type: Sequelize.STRING
      },
      durasi: {
        type: Sequelize.STRING
      },
      tech: {
        type: Sequelize.ARRAY(DataTypes.STRING)
      },
      tech1: {
        type: Sequelize.ARRAY(DataTypes.STRING)
      },
      description: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blogs');
  }
};