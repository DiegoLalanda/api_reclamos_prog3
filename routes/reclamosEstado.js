import express from 'express';
import { getAllReclamosEstado, getReclamosEstadoById, createReclamosEstado, updateReclamosEstado, deleteReclamosEstado } from '../controllers/reclamosEstadoController.js';

const router = express.Router();

// Rutas para estados de reclamos
router.get('/reclamosEstado', getAllReclamosEstado);
router.get('/reclamosEstado/:id', getReclamosEstadoById);
router.post('/reclamosEstado', createReclamosEstado);
router.put('/reclamosEstado/:id', updateReclamosEstado);
router.delete('/reclamosEstado/:id', deleteReclamosEstado);

export default router;
