import express from 'express';
import { getAllOficinas, getOficinaById, createOficina, updateOficina, deleteOficina } from '../controllers/oficinasController.js';

const router = express.Router();

// Rutas para oficinas
router.get('/oficinas', getAllOficinas);
router.get('/oficinas/:id', getOficinaById);
router.post('/oficinas', createOficina);
router.put('/oficinas/:id', updateOficina);
router.delete('/oficinas/:id', deleteOficina);

export default router;
