// data/products.js

const { v4: uuidv4 } = require('uuid');

const products = [
  {
    id: uuidv4(),
    name: 'Laptop',
    description: 'A high-end gaming laptop',
    price: 1499.99,
    category: 'electronics',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Book',
    description: 'Node.js Guidebook',
    price: 29.99,
    category: 'books',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Coffee Maker',
    description: 'Automatic drip coffee machine',
    price: 99.99,
    category: 'kitchen',
    inStock: false
  }
];

module.exports = products;
