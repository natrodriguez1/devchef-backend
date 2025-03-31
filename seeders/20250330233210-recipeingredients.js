'use strict';
const axios = require('axios');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const recipeUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
    let [recipe_ids, recipes_metadata] = await queryInterface.sequelize.query('SELECT id, api_id FROM recipes where id>149');
    let [ingredients, ingredients_metadata] = await queryInterface.sequelize.query('SELECT id FROM ingredients');

    const request = async (url) => {
      try {
        const res = await axios.get(url);
        return res.data;
      } catch (err) {
        console.log(err);
        return null;
      }
    }
    
    for(let recipe of recipe_ids){
      const response = await request(recipeUrl+recipe.api_id);
      let counter = 0;
      let ings = [];
      let meas = [];
      for(let item of Object.keys(response.meals[0])){
        //ingredients
        if(counter > 8 && counter < 29){
          if(response.meals[0][item] != null && response.meals[0][item] != "" && response.meals[0][item] != ' '){
            ings.push(response.meals[0][item]);
          }
        } else if(counter >= 29 && counter < 49){ //measurements
          if(response.meals[0][item] != null && response.meals[0][item] != "" && response.meals[0][item] != ' '){
            meas.push(response.meals[0][item]);
          }
        }
        counter = counter + 1;
      }
      
      for(let i = 0; i < ings.length; i++){
        let [ing_id, metadata] = [];
        if(ings[i]=="Gruyere cheese"){
          [ing_id, metadata] = await queryInterface.sequelize.query('SELECT id FROM ingredients WHERE name = \'Gruyère\'');
        }
        else{
          [ing_id, metadata] = await queryInterface.sequelize.query('SELECT id FROM ingredients WHERE name = \''+ings[i]+'\'');
        }
        if(ing_id[0] == null){
          [ing_id, metadata] = await queryInterface.sequelize.query('SELECT id FROM ingredients WHERE name = \''+ings[i]+'s\'');
          console.log(ings[i]+','+ing_id[0]);
        }
        await queryInterface.bulkInsert('recipe_ingredients',[{
          recipe_id: recipe.id,
          ingredient_id: ing_id[0].id,
          measure: meas[i],
          createdAt: new Date(),
          updatedAt: new Date()
        }])
      }
    }
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
