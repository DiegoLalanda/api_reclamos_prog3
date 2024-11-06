// estadisticasRoutes.js
import express from 'express';
import {
    getEstadisticasReclamosPorTipo,
    getEstadisticasReclamosPorEstado,
    getEstadisticasTiempoPromedioReclamos
} from '../controllers/estadisticasController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
import protectedRoutes from '../utils/protectedRoutes.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';

const router = express.Router();

// Ruta para obtener el total de reclamos por tipo
protectedRoutes.get('/estadisticas/reclamosTipo', 
    isAdmin, 
    getEstadisticasReclamosPorTipo,
    errorMiddleware
);

// Ruta para obtener el total de reclamos por estado
protectedRoutes.get('/estadisticas/reclamosEstado', 
    isAdmin, 
    getEstadisticasReclamosPorEstado,
    errorMiddleware
);

// Ruta para obtener el tiempo promedio de resolución de reclamos
protectedRoutes.get('/estadisticas/tiempoPromedio', 
    isAdmin, 
    getEstadisticasTiempoPromedioReclamos,
    errorMiddleware
);

router.use('/secure', protectedRoutes);

export default router;
