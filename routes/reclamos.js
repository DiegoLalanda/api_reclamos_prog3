import express from 'express';
import ReclamosController from '../controllers/reclamosController.js';
import { isAdmin } from '../middlewares/authMiddleware.js'; // Asegúrate de que tienes el middleware isAdmin
import protectedRoutes from '../utils/protectedRoutes.js';

const router = express.Router();
const reclamosController = new ReclamosController();

// Rutas de reclamos
protectedRoutes.get('/reclamos', reclamosController.findAllReclamos);
protectedRoutes.get('/reclamos/:idReclamo', reclamosController.findByIdReclamo);
protectedRoutes.post('/reclamos', reclamosController.createReclamo);
protectedRoutes.put('/reclamos/:idReclamo', reclamosController.updateReclamo);
protectedRoutes.put('/reclamos/:idReclamo/estado', reclamosController.actualizarEstadoReclamo);

// Ruta para descargar el informe PDF
protectedRoutes.get('/informe-pdf', 
    isAdmin, 
    reclamosController.descargarInformeReclamos
);

router.use('/secure', protectedRoutes);

export default router;
