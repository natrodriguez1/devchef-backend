'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('recipe_ingredients',{
      fields: ['recipe_id'],
      name: 'recipe_id_fk',
      type: 'foreign key',
      references:{
        table: 'recipes',
        field: 'id'
      },
      onDelet:'cascade',
      onUpdate: 'set null'
    });

    await queryInterface.addConstraint('recipe_ingredients',{
      fields: ['ingredient_id'],
      name: 'ingredient_id_fk',
      type: 'foreign key',
      references:{
        table: 'ingredients',
        field: 'id'
      },
      onDelet:'cascade',
      onUpdate: 'set null'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('recipe_ingredients', 'recipe_id_fk')
    await queryInterface.removeConstraint('recipe_ingredients', 'ingredient_id_fk')
  }
};
