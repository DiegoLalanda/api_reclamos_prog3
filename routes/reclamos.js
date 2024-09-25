import express from 'express';
import ReclamosController from '../controllers/reclamosController.js';

const router = express.Router();
const reclamosController = new ReclamosController();

// Ruta para actualizar el estado de un reclamo
router.put('/reclamos/:idReclamo/estado', reclamosController.actualizarEstadoReclamo);

export default router;
