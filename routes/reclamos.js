import express from 'express';
import ReclamosController from '../controllers/reclamosController.js';
import { verifyToken, isClient } from '../middlewares/authMiddleware.js';

const router = express.Router();
const reclamosController = new ReclamosController();

router.get('/reclamos', reclamosController.findAllReclamos);
router.get('/reclamos/:idReclamo', reclamosController.findByIdReclamo);
router.post('/reclamos', reclamosController.createReclamo);
router.put('/reclamos/:idReclamo', reclamosController.updateReclamo);
router.delete('/reclamos/:idReclamo', reclamosController.deleteReclamo);
router.put('/reclamos/:idReclamo/estado', reclamosController.actualizarEstadoReclamo);

// Ejemplo con auth middleware
// router.post('/reclamos', verifyToken, isClient, reclamosController.create);  

export default router;
