'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipeingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recipeingredient.init({
    recipe_id: DataTypes.INTEGER,
    ingredient_id: DataTypes.INTEGER,
    measure: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'recipeingredient',
    tableName: 'recipe_ingredients'
  });
  return recipeingredient;
};