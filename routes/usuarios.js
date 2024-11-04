import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';
import AuthController from '../controllers/authController.js';
import { isAdmin, isAdminOrSelf } from '../middlewares/authMiddleware.js';
import protectedRoutes from '../utils/protectedRoutes.js';
import { registerValidator, updateUsuarioValidator } from '../validators/usuarioValidator.js';

const router = express.Router();
const usuariosController = new UsuariosController(); 
const authController = new AuthController();

// Ruta que no requieren autenticación
router.post('/registro', registerValidator, usuariosController.create); 
router.post('/login', authController.login);

// Rutas que requieren autenticación
protectedRoutes.post('/logout', authController.logout);
protectedRoutes.get('/usuarios', isAdmin, usuariosController.findAll);
protectedRoutes.get('/usuarios/:id', isAdminOrSelf, usuariosController.findById);
protectedRoutes.put('/usuarios/:id', updateUsuarioValidator, isAdminOrSelf, usuariosController.update);
protectedRoutes.delete('/usuarios/:id', isAdmin, usuariosController.destroy);

router.use('/secure', protectedRoutes);

export default router;
