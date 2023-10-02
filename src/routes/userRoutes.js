const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas de autenticación de usuario
router.post('/register', userController.register);
router.post('/login', userController.login);

// Rutas protegidas por el middleware de autenticación
router.use(authMiddleware);

// Rutas CRUD para usuarios
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
