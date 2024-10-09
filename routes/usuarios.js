import express from 'express';
import UsuariosController from '../controllers/usuariosController.js'; // Asegúrate de usar la extensión .js
import AuthController from '../controllers/authController.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();
const usuariosController = new UsuariosController(); // Crear instancia del controlador
const authController = new AuthController();

// Ruta pública
router.post('/login', authController.login);

// Rutas para usuarios
router.get('/usuarios', usuariosController.findAll); // Cambiar de getAllUsers a findAll
router.get('/usuarios/:id', usuariosController.findById); // Cambiar de getUserById a findById
router.post('/usuarios', usuariosController.create); // Cambiar de createUser a create
router.put('/usuarios/:id', usuariosController.update); // Cambiar de updateUser a update
router.delete('/usuarios/:id', usuariosController.destroy); // Cambiar de deleteUser a destroy

// Ejemplo con middleware
// router.delete('/usuarios/:id', verifyToken, isAdmin, usuariosController.destroy); // Solo accesible para administradores

export default router;
