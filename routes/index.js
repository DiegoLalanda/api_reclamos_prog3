import express from 'express';
import usuarioRoutes from './usuarios.js'; // Cambia a la sintaxis de importación ES
import reclamosRoutes from './reclamos.js'; // Cambia a la sintaxis de importación ES
import usuariosTipoRoutes from './usuariosTipo.js';

const router = express.Router();

// Definir la versión de la API
const API_VERSION = 'v1';

// Usar las rutas con el prefijo de versión
router.use(`/api/${API_VERSION}`, usuarioRoutes);
router.use(`/api/${API_VERSION}`, reclamosRoutes);
router.use(`/api/${API_VERSION}`, usuariosTipoRoutes);

export default router; // Exporta como default
