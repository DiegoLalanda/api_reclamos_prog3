const express = require('express');
const router = express.Router();

// Importar las rutas
const usuarioRoutes = require('./usuarios');
const reclamosRoutes = require('./reclamos');
const rolTiposRoutes = require('./roltipo'); // Importa las rutas de rolTipos

// Usar las rutas
router.use('/api/usuarios', usuarioRoutes); // Asegúrate de definir los endpoints correctamente
router.use('/api/reclamos', reclamosRoutes); // Asegúrate de definir los endpoints correctamente
router.use('/api/roltipo', rolTiposRoutes); // Define la ruta para rolTipos

module.exports = router;
