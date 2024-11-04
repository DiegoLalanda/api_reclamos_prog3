import express from 'express';
import ReclamosController from '../controllers/reclamosController.js';
import { isAdmin, isClient, isEmployee } from '../middlewares/authMiddleware.js';
import protectedRoutes from '../utils/protectedRoutes.js';

const router = express.Router();
const reclamosController = new ReclamosController();

// Rutas de reclamos
protectedRoutes.get('/reclamos', isAdmin, reclamosController.findAllReclamos); 
protectedRoutes.get('/reclamos/:idReclamo', isAdmin, reclamosController.findByIdReclamo); 
protectedRoutes.post('/reclamos', isClient, reclamosController.createReclamo); 
protectedRoutes.put('/reclamos/:idReclamo', reclamosController.updateReclamo); 
protectedRoutes.put('/reclamos/:idReclamo/estado', isClient, reclamosController.actualizarEstadoReclamo); 
protectedRoutes.get('/reclamos/:idReclamo/estado', isClient, reclamosController.consultarEstadoReclamo); 
protectedRoutes.get('/reclamos/oficina/:idOficina', isEmployee, reclamosController.atenderReclamos); 

// Ruta para descargar el informe PDF
protectedRoutes.get('/informe-pdf', isAdmin, reclamosController.descargarInformeReclamos); 

router.use('/secure', protectedRoutes);

export default router;
