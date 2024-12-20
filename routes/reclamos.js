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

// Cancelar Reclamo
protectedRoutes.put('/reclamos/:idReclamo/cancelar',isClient, reclamosController.cancelarReclamo);

// Enviar Mail
protectedRoutes.put('/reclamos/:idReclamo/estado',isEmployee, updateEstadoReclamoValidator, errorMiddleware, reclamosController.actualizarEstadoReclamo);

//Listar los reclamos asignados de su oficina.
protectedRoutes.get('/oficina/empleado/reclamo', isEmployee, reclamosController.findReclamosByOficina); 

// Ruta para descargar el informe PDF
protectedRoutes.get('/informe-pdf', isAdmin, reclamosController.descargarInformeReclamos); 

router.use('/secure', protectedRoutes);

export default router;
