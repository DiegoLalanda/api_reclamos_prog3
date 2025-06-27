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

/**
 * @swagger
 * tags:
 *   name: Estadisticas
 *   description: (Admin) Endpoints para obtener métricas y estadísticas del sistema.
 */

/**
 * @swagger
 * /secure/estadisticas/reclamosTipo:
 *   get:
 *     summary: (Admin) Obtiene el total de reclamos agrupados por tipo.
 *     tags: [Estadisticas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Un array con el total de reclamos por tipo.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   tipo: { type: string, example: "Falla de Motor" }
 *                   total: { type: integer, example: 15 }
 *       '403':
 *         description: Acceso denegado.
 */
protectedRoutes.get('/estadisticas/reclamosTipo', isAdmin, getEstadisticasReclamosPorTipo, errorMiddleware);

/**
 * @swagger
 * /secure/estadisticas/reclamosEstado:
 *   get:
 *     summary: (Admin) Obtiene el total de reclamos agrupados por estado.
 *     tags: [Estadisticas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Un array con el total de reclamos por estado.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   estado: { type: string, example: "En Proceso" }
 *                   total: { type: integer, example: 8 }
 */
protectedRoutes.get('/estadisticas/reclamosEstado', isAdmin, getEstadisticasReclamosPorEstado, errorMiddleware);

/**
 * @swagger
 * /secure/estadisticas/tiempoPromedio:
 *   get:
 *     summary: (Admin) Obtiene el tiempo promedio de resolución de reclamos en horas.
 *     tags: [Estadisticas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: El tiempo promedio de resolución.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tiempoPromedioHoras: { type: number, format: float, example: 48.5 }
 */
protectedRoutes.get('/estadisticas/tiempoPromedio', isAdmin, getEstadisticasTiempoPromedioReclamos, errorMiddleware);

router.use('/secure', protectedRoutes);

export default router;