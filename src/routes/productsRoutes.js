const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas públicas para obtener productos (no requieren autenticación)
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Rutas protegidas que requieren autenticación (ejemplo)
router.use(authMiddleware.verifyToken);

router.post('/', authMiddleware.checkRole('admin'), productController.createProduct);
router.put('/:id', authMiddleware.checkRole('admin'), productController.updateProduct);
router.delete('/:id', authMiddleware.checkRole('admin'), productController.deleteProduct);

module.exports = router;
