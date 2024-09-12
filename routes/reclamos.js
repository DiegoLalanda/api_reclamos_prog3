const express = require('express');
const router = express.Router();
const { actualizarEstadoReclamo } = require('../controllers/reclamosController');

// Ruta para actualizar el estado de un reclamo
router.put('/reclamos/:idReclamo/estado', actualizarEstadoReclamo);

module.exports = router;
