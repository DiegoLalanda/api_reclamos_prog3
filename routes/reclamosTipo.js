import express from 'express';
import { getAllReclamosTipo, getReclamosTipoById, createReclamosTipo, updateReclamosTipo, deleteReclamosTipo } from '../controllers/reclamosTipoController.js';

const router = express.Router();

// Rutas para tipos de reclamos
router.get('/reclamosTipo', getAllReclamosTipo);
router.get('/reclamosTipo/:id', getReclamosTipoById);
router.post('/reclamosTipo', createReclamosTipo);
router.put('/reclamosTipo/:id', updateReclamosTipo);
router.delete('/reclamosTipo/:id', deleteReclamosTipo);

export default router;
