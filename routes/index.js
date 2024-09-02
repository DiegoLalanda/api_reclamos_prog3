const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rutas para usuarios
router.get('/usuarios', usuariosController.getAllUsers);
router.get('/usuarios/:id', usuariosController.getUserById);
router.post('/usuarios', usuariosController.createUser);
router.put('/usuarios/:id', usuariosController.updateUser);
router.delete('/usuarios/:id', usuariosController.deleteUser);

module.exports = router;
