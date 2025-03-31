'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.area.belongsToMany(models.recipe, {
        through: recipe,
        foreignKey: "area_id"
      });
    }
  }
  area.init({
    name: DataTypes.STRING,
    img_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'area',
    tableName: 'areas'
  });
  return area;
};