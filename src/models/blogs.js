'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blogs.init({
    projectname: DataTypes.STRING,
    datestarterror: DataTypes.STRING,
    dateenderror: DataTypes.STRING,
    durasi: DataTypes.STRING,
    tech: DataTypes.ARRAY(DataTypes.STRING),
    tech1: DataTypes.ARRAY(DataTypes.STRING),
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'blogs',
  });
  return blogs;
};