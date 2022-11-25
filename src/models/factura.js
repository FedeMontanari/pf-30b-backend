const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "factura",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      transaction_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      payment_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};