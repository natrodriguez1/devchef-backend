'use strict';
const axios = require('axios');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const apiIngr = 'www.themealdb.com/images/ingredients/'
    
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

    for(let ingredient of response.meals){
      let ingredientName = ingredient.strIngredient;
      const url = apiIngr+ingredientName+'.png';
      await queryInterface.bulkInsert('ingredients', [{
        name: ingredientName,
        description: ingredient.strDescription,
        img_url: url,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ingredients', null, {});
  }
};
