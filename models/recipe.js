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
      // define association here
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
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'recipe',
    tableName: 'recipes'
  });
  return recipe;
};