import express from 'express';
import { 
    getAllOficinas, 
    getOficinaById, 
    createOficina, 
    updateOficina 
} from '../controllers/oficinasController.js';
import { createOficinaValidator, updateOficinaValidator } from '../validators/oficinaValidator.js';
import {isAdmin} from '../middlewares/authMiddleware.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';
import protectedRoutes from '../utils/protectedRoutes.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Oficinas
 *   description: (Admin) Gestión de oficinas.
 */

/**
 * @swagger
 * /secure/oficinas:
 *   get:
 *     summary: (Admin) Obtiene todas las oficinas.
 *     tags: [Oficinas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200': { description: "Lista de oficinas.", content: { application/json: { schema: { type: 'array', items: { $ref: '#/components/schemas/Oficina' } } } } }
 */
protectedRoutes.get('/oficinas', isAdmin, getAllOficinas);

/**
 * @swagger
 * /secure/oficinas/{id}:
 *   get:
 *     summary: (Admin) Obtiene una oficina por ID.
 *     tags: [Oficinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200': { description: "Detalles de la oficina.", content: { application/json: { schema: { $ref: '#/components/schemas/Oficina' } } } }
 */
protectedRoutes.get('/oficinas/:id', isAdmin, getOficinaById);

/**
 * @swagger
 * /secure/oficinas:
 *   post:
 *     summary: (Admin) Crea una nueva oficina.
 *     tags: [Oficinas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: "string", example: "Departamento de Ventas" }
 *               idReclamoTipo: { type: "integer", example: 3 }
 *               activo: { type: "boolean", example: true }
 *     responses:
 *       '201': { description: "Oficina creada." }
 */
protectedRoutes.post('/oficinas', isAdmin, createOficinaValidator, errorMiddleware, createOficina);

/**
 * @swagger
 * /secure/oficinas/{id}:
 *   put:
 *     summary: (Admin) Actualiza una oficina.
 *     tags: [Oficinas]
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
 *               nombre: { type: "string" }
 *               idReclamoTipo: { type: "integer" }
 *               activo: { type: "boolean" }
 *     responses:
 *       '200': { description: "Oficina actualizada." }
 */
protectedRoutes.put('/oficinas/:id', isAdmin, updateOficinaValidator, errorMiddleware, updateOficina);

router.use('/secure', protectedRoutes);

export default router;