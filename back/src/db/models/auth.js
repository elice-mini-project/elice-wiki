'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Auth.init({
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    url: DataTypes.STRING,
    source: DataTypes.STRING,
    current: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Auth',
  });
  return Auth;
};