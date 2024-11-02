import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';
import AuthController from '../controllers/authController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
import protectedRoutes from '../utils/protectedRoutes.js';

const router = express.Router();
const usuariosController = new UsuariosController(); 
const authController = new AuthController();

// Ruta que no requieren autenticación
router.post('/registro', usuariosController.create); 
router.post('/login', authController.login);

// Rutas que requieren autenticación
protectedRoutes.post('/logout', authController.logout);
protectedRoutes.get('/usuarios', isAdmin, usuariosController.findAll);
protectedRoutes.get('/usuarios/:id', isAdmin, usuariosController.findById);
protectedRoutes.put('/usuarios/:id', isAdmin, usuariosController.update);
protectedRoutes.delete('/usuarios/:id', isAdmin, usuariosController.destroy);

router.use('/secure', protectedRoutes);

export default router;
