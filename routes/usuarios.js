import express from 'express';
import UsuariosController from '../controllers/usuariosController.js'; // Asegúrate de usar la extensión .js
import AuthController from '../controllers/authController.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';
import passport from 'passport';


const router = express.Router();
const usuariosController = new UsuariosController(); // Crear instancia del controlador
const authController = new AuthController();

// Ruta para iniciar sesión
router.post('/login', authController.login);
// Ruta para cerrar la sesión
router.post('/logout', authController.logout);

// Rutas protegidas (requieren autenticación)
router.get('/usuarios', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Aquí puedes acceder a req.user, que contendrá los datos del usuario autenticado
    res.json({ message: 'Ruta protegida', user: req.user });
});


// Rutas para usuarios
router.get('/usuarios', usuariosController.findAll); 
router.get('/usuarios/:id', usuariosController.findById); 
//router.post('/usuarios', usuariosController.create); 
router.put('/usuarios/:id', usuariosController.update); 
router.delete('/usuarios/:id', usuariosController.destroy); 

// Ejemplo con middleware
// router.delete('/usuarios/:id', verifyToken, isAdmin, usuariosController.destroy); // Solo accesible para administradores

export default router;
