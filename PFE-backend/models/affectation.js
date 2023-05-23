"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Affectation extends Model {
  
    // static associate(models) {
    // this.hasMany(models.Demande);
    // }
    // static associate(models) {
    //     this.belongsTo(models.User);
    //   }
  }
  Affectation.init(
    {
        num: {
            type: DataTypes.STRING,
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        unite_de_base: {
            type: DataTypes.STRING,
        },  
        charge_daffaire: {
            type: DataTypes.STRING,
        },
        region: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: "affectation",
    }
  );
  return Affectation;
}