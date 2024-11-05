import express from 'express';
import ReclamosController from '../controllers/reclamosController.js';
import { isAdmin, isClient, isEmployee } from '../middlewares/authMiddleware.js';
import protectedRoutes from '../utils/protectedRoutes.js';
import { createReclamoValidator, updateEstadoReclamoValidator } from '../validators/reclamoValidator.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';

const router = express.Router();
const reclamosController = new ReclamosController();

// Rutas de reclamos
protectedRoutes.get('/reclamos', isAdmin, reclamosController.findAllReclamos); 
protectedRoutes.get('/reclamos/:idReclamo', isAdmin, reclamosController.findByIdReclamo); 
protectedRoutes.post('/reclamos', isClient, createReclamoValidator, errorMiddleware,reclamosController.createReclamo);
protectedRoutes.put('/reclamos/:idReclamo', reclamosController.updateReclamo); 
protectedRoutes.get('/reclamos/:idReclamo/estado', isClient, reclamosController.consultarEstadoReclamo); 


// Enviar Mail
protectedRoutes.put('/reclamos/:idReclamo/estado', reclamosController.actualizarEstadoReclamo);

protectedRoutes.get('/reclamos/oficina/:idOficina', isEmployee, reclamosController.atenderReclamos); 

// Ruta para descargar el informe PDF
protectedRoutes.put('/reclamos/:idReclamo/estado',isClient, updateEstadoReclamoValidator, errorMiddleware, reclamosController.actualizarEstadoReclamo);

router.use('/secure', protectedRoutes);

export default router;
