// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo one Category
Product.belongsTo(Category, {
  foreignKey: 'product_id'
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});
// Products belongToMany Tags (connected through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  }
});
// Tags belongToMany Products (connected through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  }
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
