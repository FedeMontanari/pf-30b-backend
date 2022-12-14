const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
