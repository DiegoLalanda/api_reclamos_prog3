import express from 'express';
import ReclamosController from '../controllers/reclamosController.js';

const router = express.Router();
const reclamosController = new ReclamosController();

router.get('/reclamos', reclamosController.findAllReclamos);
router.get('/reclamos/:idReclamo', reclamosController.findByIdReclamo);
router.post('/reclamos', reclamosController.createReclamo);
router.put('/reclamos/:idReclamo', reclamosController.updateReclamo);
router.delete('/reclamos/:idReclamo', reclamosController.deleteReclamo);
router.put('/reclamos/:idReclamo/estado', reclamosController.actualizarEstadoReclamo);

export default router;
