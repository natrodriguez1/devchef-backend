'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.recipe.belongsTo(models.user, {
        through: 'recipe',
        foreignKey: "user_id"
      });
      models.recipe.belongsTo(models.area, {
        through: 'recipe',
        foreignKey: "area_id"
      });
      models.recipe.belongsTo(models.category, {
        through: 'recipe',
        foreignKey: "category_id"
      });
      models.recipe.belongsToMany(models.ingredient,{
        through: 'recipe_ingredients',
        foreignKey: "recipe_id"
      });
    }
  }
  recipe.init({
    name: DataTypes.STRING,
    instructions: DataTypes.TEXT,
    thumbnail_url: DataTypes.STRING,
    youtube_url: DataTypes.STRING,
    tags: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    area_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    api_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'recipe',
    tableName: 'recipes'
  });
  return recipe;
};