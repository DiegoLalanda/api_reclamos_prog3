import express from 'express';
import ReclamosController from '../controllers/reclamosController.js';
import { isAdmin, isClient, isEmployee } from '../middlewares/authMiddleware.js';
import protectedRoutes from '../utils/protectedRoutes.js';
import { createReclamoValidator, updateEstadoReclamoValidator } from '../validators/reclamoValidator.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';

const router = express.Router();
const reclamosController = new ReclamosController();

/**
 * @swagger
 * tags:
 *   name: Reclamos
 *   description: Endpoints para la gestión completa del ciclo de vida de los reclamos.
 */

/**
 * @swagger
 * /secure/reclamos:
 *   get:
 *     summary: (Admin) Obtiene una lista de todos los reclamos del sistema.
 *     tags: [Reclamos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Una lista de reclamos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reclamo'
 *       '403':
 *         description: Acceso denegado.
 */
protectedRoutes.get('/reclamos', isAdmin, reclamosController.findAllReclamos);

/**
 * @swagger
 * /secure/reclamos:
 *   post:
 *     summary: (Cliente) Crea un nuevo reclamo.
 *     tags: [Reclamos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [asunto, idReclamoTipo]
 *             properties:
 *               asunto:
 *                 type: string
 *                 example: "Falla en el sistema de frenos"
 *               descripcion:
 *                 type: string
 *                 example: "El pedal de freno se siente esponjoso y el coche tarda en detenerse."
 *               idReclamoTipo:
 *                 type: integer
 *                 description: ID del tipo de reclamo (ej. 1 para Mecánico).
 *                 example: 1
 *     responses:
 *       '201':
 *         description: Reclamo creado exitosamente.
 *       '400':
 *         description: Datos de entrada inválidos.
 *       '403':
 *         description: Acceso denegado.
 */
protectedRoutes.post('/reclamos', isClient, createReclamoValidator, errorMiddleware, reclamosController.createReclamo);

/**
 * @swagger
 * /secure/reclamos/{idReclamo}:
 *   get:
 *     summary: (Admin) Obtiene los detalles de un reclamo específico por su ID.
 *     tags: [Reclamos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idReclamo
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID numérico del reclamo a obtener.
 *     responses:
 *       '200':
 *         description: Detalles del reclamo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reclamo'
 *       '404':
 *         description: Reclamo no encontrado.
 */
protectedRoutes.get('/reclamos/:idReclamo', isAdmin, reclamosController.findByIdReclamo);

/**
 * @swagger
 * /secure/reclamos/{idReclamo}:
 *   put:
 *     summary: (Admin/Empleado) Actualiza el asunto o descripción de un reclamo.
 *     tags: [Reclamos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idReclamo
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               asunto: { type: "string" }
 *               descripcion: { type: "string" }
 *     responses:
 *       '200':
 *         description: Reclamo actualizado exitosamente.
 */
protectedRoutes.put('/reclamos/:idReclamo', reclamosController.updateReclamo);

/**
 * @swagger
 * /secure/reclamos/{idReclamo}/estado:
 *   get:
 *     summary: (Cliente) Consulta el estado de un reclamo propio.
 *     tags: [Reclamos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idReclamo
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         description: Estado actual del reclamo.
 *       '404':
 *         description: Reclamo no encontrado o no pertenece al usuario.
 */
protectedRoutes.get('/reclamos/:idReclamo/estado', isClient, reclamosController.consultarEstadoReclamo);

/**
 * @swagger
 * /secure/reclamos/{idReclamo}/cancelar:
 *   put:
 *     summary: (Cliente) Cancela un reclamo que ha creado.
 *     tags: [Reclamos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idReclamo
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         description: Reclamo cancelado exitosamente.
 *       '404':
 *         description: Reclamo no encontrado o no pertenece al usuario.
 */
protectedRoutes.put('/reclamos/:idReclamo/cancelar', isClient, reclamosController.cancelarReclamo);

/**
 * @swagger
 * /secure/reclamos/{idReclamo}/actualizar-estado:
 *   put:
 *     summary: (Empleado) Actualiza el estado de un reclamo y notifica al cliente por correo.
 *     tags: [Reclamos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idReclamo
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nuevoEstado:
 *                 type: integer
 *                 description: El ID del nuevo estado para el reclamo.
 *                 example: 2
 *     responses:
 *       '200':
 *         description: Estado del reclamo actualizado y correo enviado.
 *       '403':
 *         description: Acceso denegado.
 */
// Renombré la ruta para evitar conflictos
protectedRoutes.put('/reclamos/:idReclamo/actualizar-estado', isEmployee, updateEstadoReclamoValidator, errorMiddleware, reclamosController.actualizarEstadoReclamo);

/**
 * @swagger
 * /secure/oficina/empleado/reclamo:
 *   get:
 *     summary: (Empleado) Lista los reclamos asignados a la oficina del empleado autenticado.
 *     tags: [Reclamos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Una lista de reclamos correspondientes a la oficina del empleado.
 *       '404':
 *         description: El empleado no tiene oficina asignada o no hay reclamos para esa oficina.
 */
protectedRoutes.get('/oficina/empleado/reclamo', isEmployee, reclamosController.findReclamosByOficina);

/**
 * @swagger
 * /secure/informe-pdf:
 *   get:
 *     summary: (Admin) Descarga un informe en PDF con todos los reclamos.
 *     tags: [Reclamos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Un archivo PDF para descargar.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */
protectedRoutes.get('/informe-pdf', isAdmin, reclamosController.descargarInformeReclamos);

router.use('/secure', protectedRoutes);

export default router;