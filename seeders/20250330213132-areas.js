'use strict';
const axios = require('axios');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    
    const request = async () => {
      try {
        const res = await axios.get(apiUrl);
        return res.data;
      } catch (err) {
        console.log(err);
        return null;
      }
    }

    const response = await request();
    
    for(let area of response.meals){
      await queryInterface.bulkInsert('areas', [{
        name: area.strArea,
        img_url: 'assets/'+area.strArea+'.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('areas', null, {});
  }
};
