// estadisticasRoutes.js
import express from 'express';
import passport from 'passport';
import {
    getEstadisticasReclamosPorTipo,
    getEstadisticasReclamosPorEstado,
    getEstadisticasTiempoPromedioReclamos
} from '../controllers/estadisticasController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';

const router = express.Router();

// Ruta para obtener el total de reclamos por tipo
router.get('/estadisticas/reclamosTipo', 
    passport.authenticate('jwt', { session: false }), 
    isAdmin, 
    getEstadisticasReclamosPorTipo,
    errorMiddleware
);

// Ruta para obtener el total de reclamos por estado
router.get('/estadisticas/reclamosEstado', 
    passport.authenticate('jwt', { session: false }), 
    isAdmin, 
    getEstadisticasReclamosPorEstado,
    errorMiddleware
);

// Ruta para obtener el tiempo promedio de resolución de reclamos
router.get('/estadisticas/tiempoPromedio', 
    passport.authenticate('jwt', { session: false }), 
    isAdmin, 
    getEstadisticasTiempoPromedioReclamos,
    errorMiddleware
);

export default router;
