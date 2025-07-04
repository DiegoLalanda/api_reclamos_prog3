import express from 'express';
import usuarioRoutes from './usuarios.js';
import reclamosRoutes from './reclamos.js';
import usuariosTipoRoutes from './usuariosTipo.js';
import oficinasRoutes from './oficinas.js';
import usuariosOficinasRoutes from './usuariosOficinas.js';
import reclamosTipoRoutes from './reclamosTipo.js';
import reclamosEstadoRoutes from './reclamosEstado.js';
import estadisticasRoutes from './estadisticas.js';
import empleadosRoutes from './empleados.js';

import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from '../config/swagger.js';

const router = express.Router();

// Definir la versión de la API
const API_VERSION = 'v1';

// --- NUEVO ENDPOINT DE HEALTH CHECK ---
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica el estado del servidor.
 *     tags: [Health Check]
 *     description: Endpoint simple para verificar que la API está en funcionamiento. Ideal para servicios de monitoreo como UptimeRobot.
 *     responses:
 *       '200':
 *         description: El servidor está funcionando correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: "ok" }
 *                 timestamp: { type: string, format: date-time }
 */
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

// ¡NUEVA RUTA! La documentación ahora vive aquí
router.use(`/api/${API_VERSION}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Usar las rutas con el prefijo de versión
router.use(`/api/${API_VERSION}`, usuarioRoutes);
router.use(`/api/${API_VERSION}`, reclamosRoutes);
router.use(`/api/${API_VERSION}`, usuariosTipoRoutes);
router.use(`/api/${API_VERSION}`, oficinasRoutes);
router.use(`/api/${API_VERSION}`, usuariosOficinasRoutes);
router.use(`/api/${API_VERSION}`, reclamosTipoRoutes);
router.use(`/api/${API_VERSION}`, reclamosEstadoRoutes);
router.use(`/api/${API_VERSION}`, estadisticasRoutes);
router.use(`/api/${API_VERSION}`, empleadosRoutes);

export default router;
