import express from 'express';
import { 
    getAllReclamosTipo, 
    getReclamosTipoById, 
    createReclamosTipo, 
    updateReclamosTipo, 
} from '../controllers/reclamosTipoController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';
import { createReclamosTipoValidator, updateReclamosTipoValidator } from '../validators/reclamoTipoValidator.js';
import protectedRoutes from '../utils/protectedRoutes.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reclamos - Tipos
 *   description: (Admin) Gestión de los tipos de reclamos disponibles.
 */

/**
 * @swagger
 * /secure/reclamosTipo:
 *   get:
 *     summary: (Admin) Obtiene todos los tipos de reclamo.
 *     tags: [Reclamos - Tipos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200': { description: "Lista de tipos de reclamo." }
 */
protectedRoutes.get('/reclamosTipo', isAdmin, getAllReclamosTipo);

/**
 * @swagger
 * /secure/reclamosTipo/{id}:
 *   get:
 *     summary: (Admin) Obtiene un tipo de reclamo por ID.
 *     tags: [Reclamos - Tipos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200': { description: "Detalles del tipo de reclamo." }
 */
protectedRoutes.get('/reclamosTipo/:id', isAdmin, getReclamosTipoById);

/**
 * @swagger
 * /secure/reclamosTipo:
 *   post:
 *     summary: (Admin) Crea un nuevo tipo de reclamo.
 *     tags: [Reclamos - Tipos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion: { type: "string", example: "Problema de Chapa y Pintura" }
 *               activo: { type: "boolean", example: true }
 *     responses:
 *       '201': { description: "Tipo de reclamo creado." }
 */
protectedRoutes.post('/reclamosTipo', isAdmin, createReclamosTipoValidator, errorMiddleware, createReclamosTipo);

/**
 * @swagger
 * /secure/reclamosTipo/{id}:
 *   put:
 *     summary: (Admin) Actualiza un tipo de reclamo.
 *     tags: [Reclamos - Tipos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion: { type: "string" }
 *               activo: { type: "boolean" }
 *     responses:
 *       '200': { description: "Tipo de reclamo actualizado." }
 */
protectedRoutes.put('/reclamosTipo/:id', isAdmin, updateReclamosTipoValidator, errorMiddleware, updateReclamosTipo);

router.use('/secure', protectedRoutes);

export default router;