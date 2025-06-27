import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';
import AuthController from '../controllers/authController.js';
import { isAdmin, isAdminOrSelf } from '../middlewares/authMiddleware.js';
import protectedRoutes from '../utils/protectedRoutes.js';
import { registerValidator, updateUsuarioValidator } from '../validators/usuarioValidator.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';

const router = express.Router();
const usuariosController = new UsuariosController(); 
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints para autenticación, registro y sesión de usuarios.
 */

/**
 * @swagger
 * /registro:
 *   post:
 *     summary: Registra un nuevo usuario de tipo CLIENTE.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: "string", example: "Cliente" }
 *               apellido: { type: "string", example: "Prueba" }
 *               correoElectronico: { type: "string", example: "cliente@prueba.com" }
 *               contrasenia: { type: "string", example: "password123" }
 *     responses:
 *       '201':
 *         description: Usuario cliente registrado exitosamente.
 *         content:
 *           application/json: { schema: { $ref: '#/components/schemas/Usuario' } }
 *       '409':
 *         description: El correo electrónico ya está en uso.
 */
router.post('/registro', registerValidator, errorMiddleware, usuariosController.create);

/**
 * @swagger
 * /registro-admin:
 *   post:
 *     summary: (Demo) Registra un nuevo usuario de tipo ADMINISTRADOR para pruebas.
 *     description: Endpoint público para que los reclutadores puedan crear una cuenta de administrador y probar todas las funcionalidades.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: "string", example: "Admin" }
 *               apellido: { type: "string", example: "Reclutador" }
 *               correoElectronico: { type: "string", example: "admin@prueba.com" }
 *               contrasenia: { type: "string", example: "password123" }
 *     responses:
 *       '201':
 *         description: Usuario administrador registrado exitosamente.
 *         content:
 *           application/json: { schema: { $ref: '#/components/schemas/Usuario' } }
 *       '409':
 *         description: El correo electrónico ya está en uso.
 */
router.post('/registro-admin', registerValidator, errorMiddleware, usuariosController.createAdmin);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión y obtiene un token JWT.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correoElectronico: { type: "string", example: "admin@prueba.com" }
 *               contrasenia: { type: "string", example: "password123" }
 *     responses:
 *       '200':
 *         description: Login exitoso. El token se setea en cookie y se devuelve en el cuerpo.
 *       '401':
 *         description: Credenciales inválidas.
 */
router.post('/login', authController.login);

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios (clientes).
 */

/**
 * @swagger
 * /secure/logout:
 *   post:
 *     summary: Cierra la sesión del usuario.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Sesión cerrada exitosamente.
 */
protectedRoutes.post('/logout', authController.logout);

/**
 * @swagger
 * /secure/usuarios:
 *   get:
 *     summary: (Admin) Obtiene una lista de todos los usuarios clientes.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de usuarios.
 *         content:
 *           application/json: { schema: { type: 'array', items: { $ref: '#/components/schemas/Usuario' } } }
 *       '403':
 *         description: Acceso denegado.
 */
protectedRoutes.get('/usuarios', isAdmin, usuariosController.findAll);

/**
 * @swagger
 * /secure/usuarios/{id}:
 *   get:
 *     summary: (Admin o Mismo Usuario) Obtiene un usuario por su ID.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         description: Detalles del usuario.
 *         content:
 *           application/json: { schema: { $ref: '#/components/schemas/Usuario' } }
 *       '404':
 *         description: Usuario no encontrado.
 */
protectedRoutes.get('/usuarios/:id', isAdminOrSelf, usuariosController.findById);

/**
 * @swagger
 * /secure/usuarios/{id}:
 *   delete:
 *     summary: (Admin) Desactiva (borrado lógico) un usuario.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '204':
 *         description: Usuario desactivado exitosamente.
 *       '403':
 *         description: Acceso denegado.
 */
protectedRoutes.delete('/usuarios/:id', isAdmin, usuariosController.destroy);

/**
 * @swagger
 * /secure/usuarios/{id}:
 *   put:
 *     summary: (Admin o Mismo Usuario) Actualiza los datos de un usuario.
 *     tags: [Usuarios]
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
 *       '200':
 *         description: Usuario actualizado.
 *         content:
 *           application/json: { schema: { $ref: '#/components/schemas/Usuario' } }
 */
protectedRoutes.put('/usuarios/:id', updateUsuarioValidator, isAdminOrSelf, usuariosController.update);

router.use('/secure', protectedRoutes);

export default router;