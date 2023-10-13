"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recruitments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recruitments.init(
    {
      companyName: DataTypes.STRING,
      country: DataTypes.STRING,
      area: DataTypes.STRING,
      position: DataTypes.STRING,
      compensation: DataTypes.STRING,
      skill: DataTypes.STRING,
      detail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Recruitments",
    }
  );
  return Recruitments;
};
