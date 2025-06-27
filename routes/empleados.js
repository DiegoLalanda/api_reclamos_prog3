import express from 'express';
import EmpleadosController from '../controllers/empleadosController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
import protectedRoutes from '../utils/protectedRoutes.js';
import { createEmpleadoValidator, updateEmpleadoValidator } from '../validators/empleadoValidator.js';

const router = express.Router();
const empleadosController = new EmpleadosController(); 

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: (Admin) Gestión de empleados.
 */

/**
 * @swagger
 * /secure/empleados:
 *   get:
 *     summary: (Admin) Obtiene una lista de todos los empleados.
 *     tags: [Empleados]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200': { description: "Lista de empleados.", content: { application/json: { schema: { type: 'array', items: { $ref: '#/components/schemas/Usuario' } } } } }
 *       '403': { description: "Acceso denegado.", content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } } }
 */
protectedRoutes.get('/empleados', isAdmin, empleadosController.findAll); 

/**
 * @swagger
 * /secure/empleados/{id}:
 *   get:
 *     summary: (Admin) Obtiene un empleado por su ID.
 *     tags: [Empleados]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200': { description: "Detalles del empleado.", content: { application/json: { schema: { $ref: '#/components/schemas/Usuario' } } } }
 *       '404': { description: "Empleado no encontrado." }
 */
protectedRoutes.get('/empleados/:id', isAdmin, empleadosController.findById); 

/**
 * @swagger
 * /secure/empleados:
 *   post:
 *     summary: (Admin) Crea un nuevo empleado.
 *     tags: [Empleados]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: "string" }
 *               apellido: { type: "string" }
 *               correoElectronico: { type: "string", format: "email" }
 *               contrasenia: { type: "string" }
 *     responses:
 *       '201': { description: "Empleado creado." }
 */
protectedRoutes.post('/empleados', createEmpleadoValidator, isAdmin, empleadosController.create); 

/**
 * @swagger
 * /secure/empleados/{id}:
 *   put:
 *     summary: (Admin) Actualiza un empleado.
 *     tags: [Empleados]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: "string" }
 *               apellido: { type: "string" }
 *     responses:
 *       '200': { description: "Empleado actualizado." }
 */
protectedRoutes.put('/empleados/:id', updateEmpleadoValidator, isAdmin, empleadosController.update); 

/**
 * @swagger
 * /secure/empleados/{id}:
 *   delete:
 *     summary: (Admin) Desactiva un empleado.
 *     tags: [Empleados]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '204': { description: "Empleado desactivado." }
 */
protectedRoutes.delete('/empleados/:id', isAdmin, empleadosController.destroy);

router.use('/secure', protectedRoutes);

export default router;