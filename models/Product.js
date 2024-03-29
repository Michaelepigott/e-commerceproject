
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');


class Product extends Model {}

// define Product items
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      isDecimal: true

    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isValue: 10,
      isNumeric: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: { 
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
