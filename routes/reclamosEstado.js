import express from 'express';
import { getAllReclamosEstado, getReclamosEstadoById, createReclamosEstado, updateReclamosEstado, deleteReclamosEstado } from '../controllers/reclamosEstadoController.js';
import protectedRoutes from '../utils/protectedRoutes.js';

const router = express.Router();

// Rutas para estados de reclamos
protectedRoutes.get('/reclamosEstado', getAllReclamosEstado);
protectedRoutes.get('/reclamosEstado/:id', getReclamosEstadoById);
protectedRoutes.post('/reclamosEstado', createReclamosEstado);
protectedRoutes.put('/reclamosEstado/:id', updateReclamosEstado);
protectedRoutes.delete('/reclamosEstado/:id', deleteReclamosEstado);

router.use('/secure', protectedRoutes);

export default router;
