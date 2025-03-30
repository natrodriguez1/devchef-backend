'use strict';
const axios = require('axios');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const recipeByUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

    const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    
    const request = async (url) => {
      try {
        const res = await axios.get(url);
        return res.data;
      } catch (err) {
        console.log(err);
        return null;
      }
    }

    
     for(let l of letters){
       const response = await request(recipeByUrl+l);
       
       if(response.meals != null){
        for(let recipe of response.meals){
          let [a_id, area_metadata] = await queryInterface.sequelize.query('SELECT id FROM areas WHERE name = \''+recipe.strArea+'\'');
          let [c_id, cat_metadata] = await queryInterface.sequelize.query('SELECT id FROM categories WHERE name = \''+recipe.strCategory+'\'')
          
          await queryInterface.bulkInsert('recipes', [{
            name: recipe.strMeal,
            instructions: recipe.strInstructions,
            thumbnail_url: recipe.strMealThumb,
            youtube_url: recipe.strYoutube,
            tags: recipe.strTags,
            user_id: 1,
            area_id: a_id[0].id,
            category_id: c_id[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
          }])
        }
       }
      
     }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recipes', null, {});
  }
};
