const express = require('express');
const controller = require('../controllers/product');
const router = express.Router();

router.get('/', controller.getAllProducts);
router.post('/', controller.addNewProduct);
router.patch('/:id', controller.updateProductById);
router.delete('/:id', controller.deleteProductById);

module.exports = router;
