const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas protegidas que requieren autenticación y el rol de administrador
router.use(authMiddleware.verifyToken);
router.use(authMiddleware.checkRole('admin'));

// Rutas CRUD para administradores
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);
router.post('/', adminController.createAdmin);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
