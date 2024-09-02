const express = require('express');
const router = express.Router();
const {
  getAllUsuariosTipo,
  getUsuarioTipoById, // Asegúrate de que esta función está exportada en usuariosController.js
  createUsuarioTipo,
  updateUsuarioTipo,
  deleteUsuarioTipo,
} = require('../controllers/usuariosController'); // Cambia el nombre del archivo si es necesario

// Ruta para obtener todos los tipos de usuario
router.get('/', getAllUsuariosTipo);

// Ruta para obtener un tipo de usuario por ID
router.get('/:id', getUsuarioTipoById);

// Ruta para crear un nuevo tipo de usuario
router.post('/', createUsuarioTipo);

// Ruta para actualizar un tipo de usuario
router.put('/:id', updateUsuarioTipo);

// Ruta para eliminar un tipo de usuario
router.delete('/:id', deleteUsuarioTipo);

module.exports = router;
