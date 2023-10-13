"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Application.init(
    {
      userId: DataTypes.INTEGER,
      recruitmentId: DataTypes.INTEGER,
      status: { type: DataTypes.STRING, defaultValue: "pending" },
    },
    {
      sequelize,
      modelName: "Application",
    }
  );
  return Application;
};
