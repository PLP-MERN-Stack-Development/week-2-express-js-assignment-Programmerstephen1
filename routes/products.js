// routes/products.js

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const validateProduct = require('../middleware/validateProduct');
const { NotFoundError } = require('../utils/errors');

const router = express.Router();
let products = require('../data/products');

/**
 * @route   GET /api/products/search?name=...
 */
router.get('/search', (req, res) => {
  const keyword = req.query.name?.toLowerCase();
  if (!keyword) {
    return res.status(400).json({ error: 'Please provide a name to search' });
  }

  const results = products.filter(p =>
    p.name.toLowerCase().includes(keyword)
  );

  res.json(results);
});

/**
 * @route   GET /api/products/stats
 */
router.get('/stats', (req, res) => {
  const stats = {};

  products.forEach(product => {
    const category = product.category.toLowerCase();
    stats[category] = (stats[category] || 0) + 1;
  });

  res.json(stats);
});

/**
 * @route   GET /api/products
 */
router.get('/', (req, res) => {
  let { category, page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let filtered = products;

  if (category) {
    filtered = filtered.filter(
      p => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  res.json(paginated);
});

/**
 * @route   GET /api/products/:id
 */
router.get('/:id', (req, res, next) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
  } catch (err) {
    next(err);
  }
});

/**
 * @route   POST /api/products
 */
router.post('/', validateProduct, (req, res, next) => {
  try {
    const newProduct = {
      id: uuidv4(),
      ...req.body
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

/**
 * @route   PUT /api/products/:id
 */
router.put('/:id', validateProduct, (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) throw new NotFoundError('Product not found');

    products[index] = {
      ...products[index],
      ...req.body
    };

    res.json(products[index]);
  } catch (err) {
    next(err);
  }
});

/**
 * @route   DELETE /api/products/:id
 */
router.delete('/:id', (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) throw new NotFoundError('Product not found');

    const deleted = products.splice(index, 1);
    res.json({ message: 'Product deleted', product: deleted[0] });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
