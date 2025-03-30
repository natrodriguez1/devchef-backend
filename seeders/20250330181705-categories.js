'use strict';
const axios = require('axios');
const { response } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    
    const request = async () => {
      try {
        const res = await axios.get(apiUrl);
        return res.data;
      } catch (err) {
        console.log(err);
        return null;
      }
    }

    const response = await request();  // Calling the function to make the request
    for(let category of response.categories){
      await queryInterface.bulkInsert('categories', [{
        name: category.strCategory,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
