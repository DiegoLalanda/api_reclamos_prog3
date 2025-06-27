import express from 'express';
import UsuariosTipoController from '../controllers/usuariosTipoController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
import protectedRoutes from '../utils/protectedRoutes.js';

const router = express.Router();
const usuariosTipoController = new UsuariosTipoController();

/**
 * @swagger
 * tags:
 *   name: Usuarios - Tipos (Roles)
 *   description: (Admin) Gestión de los roles del sistema (Admin, Empleado, Cliente).
 */

/**
 * @swagger
 * /secure/rol:
 *   get:
 *     summary: (Admin) Obtiene todos los tipos de usuario (roles).
 *     tags: [Usuarios - Tipos (Roles)]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200': { description: "Lista de roles." }
 */
protectedRoutes.get('/rol', isAdmin, usuariosTipoController.getAllUsuariosTipo);

/**
 * @swagger
 * /secure/rol/{id}:
 *   get:
 *     summary: (Admin) Obtiene un rol por ID.
 *     tags: [Usuarios - Tipos (Roles)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200': { description: "Detalles del rol." }
 */
protectedRoutes.get('/rol/:id', isAdmin, usuariosTipoController.getUsuarioTipoById);

/**
 * @swagger
 * /secure/rol:
 *   post:
 *     summary: (Admin) Crea un nuevo rol.
 *     tags: [Usuarios - Tipos (Roles)]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion: { type: "string", example: "Auditor Externo" }
 *     responses:
 *       '201': { description: "Rol creado." }
 */
protectedRoutes.post('/rol', isAdmin, usuariosTipoController.createUsuarioTipo);

/**
 * @swagger
 * /secure/rol/{id}:
 *   put:
 *     summary: (Admin) Actualiza un rol.
 *     tags: [Usuarios - Tipos (Roles)]
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
 *       '200': { description: "Rol actualizado." }
 */
protectedRoutes.put('/rol/:id', isAdmin, usuariosTipoController.updateUsuarioTipo);

/**
 * @swagger
 * /secure/rol/{id}:
 *   delete:
 *     summary: (Admin) Elimina un rol.
 *     tags: [Usuarios - Tipos (Roles)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '204': { description: "Rol eliminado." }
 */
protectedRoutes.delete('/rol/:id', isAdmin, usuariosTipoController.deleteUsuarioTipo);

router.use('/secure', protectedRoutes);

export default router;