import express from 'express';
import usuarioRoutes from './usuarios.js';
import reclamosRoutes from './reclamos.js';
import usuariosTipoRoutes from './usuariosTipo.js';
import oficinasRoutes from './oficinas.js';
import usuariosOficinasRoutes from './usuariosOficinas.js';
import reclamosTipoRoutes from './reclamosTipo.js';
import reclamosEstadoRoutes from './reclamosEstado.js';
import estadisticasRoutes from './estadisticas.js';

const router = express.Router();

// Definir la versión de la API
const API_VERSION = 'v1';

// Usar las rutas con el prefijo de versión
router.use(`/api/${API_VERSION}`, usuarioRoutes);
router.use(`/api/${API_VERSION}`, reclamosRoutes);
router.use(`/api/${API_VERSION}`, usuariosTipoRoutes);
router.use(`/api/${API_VERSION}`, oficinasRoutes);
router.use(`/api/${API_VERSION}`, usuariosOficinasRoutes);
router.use(`/api/${API_VERSION}`, reclamosTipoRoutes);
router.use(`/api/${API_VERSION}`, reclamosEstadoRoutes);
router.use(`/api/${API_VERSION}`, estadisticasRoutes)

export default router;
