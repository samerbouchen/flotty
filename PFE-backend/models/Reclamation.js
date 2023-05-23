"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reclamation extends Model {
  
    // static associate(models) {
    // this.hasMany(models.Demande);
    // }
  }
  Reclamation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement : true,
            allowNull: false,
            primaryKey: true,
        },
        reclamation: {
            type: DataTypes.STRING(30),
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "reclamation",
    }
  );
  return Reclamation;
}