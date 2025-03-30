'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users',[{
      username: 'edu.yaguar',
      email: 'eduardo.yaguar@uees.edu.ec',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'juan.jaramillo',
      email: 'juan.jaramillo@uees.edu.ec',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'nat.rodriguez',
      email: 'natalie.rodriguez@uees.edu.ec',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
