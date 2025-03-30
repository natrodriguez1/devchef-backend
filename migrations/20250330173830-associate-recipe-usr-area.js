'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('recipes',{
      fields: ['user_id'],
      name: 'user_id_fk',
      type: 'foreign key',
      references:{
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'set null'
    });

    await queryInterface.addConstraint('recipes',{
      fields: ['area_id'],
      name: 'area_id_fk',
      type: 'foreign key',
      references:{
        table: 'areas',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'set null'
    });

    await queryInterface.addConstraint('recipes',{
      fields: ['category_id'],
      name: 'category_id_fk',
      type: 'foreign key',
      references:{
        table: 'categories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'set null'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('recipes', 'user_id_fk')
    await queryInterface.removeConstraint('recipes','area_id_fk')
    await queryInterface.removeConstraint('recipes','category_id_fk')
  }
};
