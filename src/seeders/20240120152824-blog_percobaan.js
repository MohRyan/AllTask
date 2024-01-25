'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('blogs', [{
      id: 0,
      projectname: 'Menghasilkan SDA yang bagus',
      datestarterror: '25 January 2024',
      dateenderror: '27 January 2024',
      durasi: '2 day',
      tech: ["node-js", "java", "react"],
      tech1: ["unity", "docker", "html5"],
      description: 'halooooo ini deskripsinya',
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('blogs', null, {});

  }
};