"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  
    static associate(models) {
      this.hasMany(models.alert);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(30),
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  
    {
      sequelize,
      modelName: "user",
    }
  );
  return User;
}