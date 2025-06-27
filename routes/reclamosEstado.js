import express from 'express';
import { getAllReclamosEstado, getReclamosEstadoById, createReclamosEstado, updateReclamosEstado, deleteReclamosEstado } from '../controllers/reclamosEstadoController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
import protectedRoutes from '../utils/protectedRoutes.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reclamos - Estados
 *   description: (Admin) Gestión de los posibles estados de un reclamo.
 */

/**
 * @swagger
 * /secure/reclamosEstado:
 *   get:
 *     summary: (Admin) Obtiene todos los estados de reclamo.
 *     tags: [Reclamos - Estados]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200': { description: "Lista de estados de reclamo." }
 */
protectedRoutes.get('/reclamosEstado', isAdmin, getAllReclamosEstado);

/**
 * @swagger
 * /secure/reclamosEstado/{id}:
 *   get:
 *     summary: (Admin) Obtiene un estado de reclamo por ID.
 *     tags: [Reclamos - Estados]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200': { description: "Detalles del estado de reclamo." }
 */
protectedRoutes.get('/reclamosEstado/:id', isAdmin, getReclamosEstadoById);

/**
 * @swagger
 * /secure/reclamosEstado:
 *   post:
 *     summary: (Admin) Crea un nuevo estado de reclamo.
 *     tags: [Reclamos - Estados]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion: { type: "string", example: "Esperando Repuestos" }
 *     responses:
 *       '201': { description: "Estado de reclamo creado." }
 */
protectedRoutes.post('/reclamosEstado', isAdmin, createReclamosEstado);

/**
 * @swagger
 * /secure/reclamosEstado/{id}:
 *   put:
 *     summary: (Admin) Actualiza un estado de reclamo.
 *     tags: [Reclamos - Estados]
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
 *     responses:
 *       '200': { description: "Estado de reclamo actualizado." }
 */
protectedRoutes.put('/reclamosEstado/:id', isAdmin, updateReclamosEstado);

/**
 * @swagger
 * /secure/reclamosEstado/{id}:
 *   delete:
 *     summary: (Admin) Elimina un estado de reclamo.
 *     tags: [Reclamos - Estados]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200': { description: "Estado de reclamo eliminado." }
 */
protectedRoutes.delete('/reclamosEstado/:id', isAdmin, deleteReclamosEstado);

router.use('/secure', protectedRoutes);

export default router;