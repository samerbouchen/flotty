"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Alert extends Model {
  
    static associate(models) {
    this.belongsTo(models.user);
    }
  }
  Alert.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement : true,
            allowNull: false,
            primaryKey: true,
        },
        alert: {
            type: DataTypes.STRING,
        },
    
    },
    {
        sequelize,
        modelName: "alert",
    }
  );
  return Alert;
}