const express = require('express');
const router = express.Router();

// Importar las rutas
const usuarioRoutes = require('./usuarios');
const reclamosRoutes = require('./reclamos');

// Usar las rutas
router.use('/api', usuarioRoutes);
router.use('/api', reclamosRoutes);

module.exports = router;
