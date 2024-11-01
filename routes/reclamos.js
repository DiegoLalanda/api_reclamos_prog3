import express from 'express';
import ReclamosController from '../controllers/reclamosController.js';
import passport from 'passport'; // Importar passport
import { isAdmin } from '../middlewares/authMiddleware.js'; // Asegúrate de que tienes el middleware isAdmin

const router = express.Router();
const reclamosController = new ReclamosController();

// Rutas de reclamos
router.get('/reclamos', reclamosController.findAllReclamos);
router.get('/reclamos/:idReclamo', reclamosController.findByIdReclamo);
router.post('/reclamos', reclamosController.createReclamo);
router.put('/reclamos/:idReclamo', reclamosController.updateReclamo);
router.put('/reclamos/:idReclamo/estado', reclamosController.actualizarEstadoReclamo);

// Ruta para descargar el informe PDF, protegida por autenticación y autorización
router.get('/informe-pdf', 
    passport.authenticate('jwt', { session: false }), // Autenticación con passport
    isAdmin, // Verificar si el usuario es administrador
    reclamosController.descargarInformeReclamos
);

export default router;
