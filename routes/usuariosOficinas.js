import express from 'express';
import { getAllUsuariosOficinas, getUsuariosOficinaById, createUsuariosOficina, updateUsuariosOficina, deleteUsuariosOficina } from '../controllers/usuariosOficinasController.js';
import { isAdmin, isEmployee } from '../middlewares/authMiddleware.js';
import protectedRoutes from '../utils/protectedRoutes.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Asignaciones - Usuarios y Oficinas
 *   description: (Admin) Asigna empleados a oficinas.
 */

/**
 * @swagger
 * /secure/usuariosOficinas:
 *   get:
 *     summary: (Admin) Obtiene todas las asignaciones de usuarios a oficinas.
 *     tags: [Asignaciones - Usuarios y Oficinas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200': { description: "Lista de todas las asignaciones." }
 */
protectedRoutes.get('/usuariosOficinas', isAdmin, getAllUsuariosOficinas);

/**
 * @swagger
 * /secure/usuariosOficinas/{id}:
 *   get:
 *     summary: (Admin/Empleado) Obtiene una asignación específica por su ID.
 *     tags: [Asignaciones - Usuarios y Oficinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200': { description: "Detalles de la asignación." }
 */
protectedRoutes.get('/usuariosOficinas/:id', isEmployee, getUsuariosOficinaById); // isEmployee cubre a isAdmin si se configura bien

/**
 * @swagger
 * /secure/usuariosOficinas:
 *   post:
 *     summary: (Admin) Crea una nueva asignación de un empleado a una oficina.
 *     tags: [Asignaciones - Usuarios y Oficinas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario: { type: "integer", description: "ID del empleado a asignar." }
 *               idOficina: { type: "integer", description: "ID de la oficina a la que se asigna." }
 *     responses:
 *       '201': { description: "Asignación creada exitosamente." }
 */
protectedRoutes.post('/usuariosOficinas', isAdmin, createUsuariosOficina);

/**
 * @swagger
 * /secure/usuariosOficinas/{id}:
 *   put:
 *     summary: (Admin) Actualiza una asignación.
 *     tags: [Asignaciones - Usuarios y Oficinas]
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
 *               idOficina: { type: "integer" }
 *               activo: { type: "boolean" }
 *     responses:
 *       '200': { description: "Asignación actualizada." }
 */
protectedRoutes.put('/usuariosOficinas/:id', isAdmin, updateUsuariosOficina);

/**
 * @swagger
 * /secure/usuariosOficinas/{id}:
 *   delete:
 *     summary: (Admin) Elimina una asignación.
 *     tags: [Asignaciones - Usuarios y Oficinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200': { description: "Asignación eliminada." }
 */
protectedRoutes.delete('/usuariosOficinas/:id', isAdmin, deleteUsuariosOficina);

router.use('/secure', protectedRoutes);

export default router;