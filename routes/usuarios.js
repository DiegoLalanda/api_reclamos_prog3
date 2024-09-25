import express from 'express';
import UsuariosController from '../controllers/usuariosController.js'; // Asegúrate de usar la extensión .js

const router = express.Router();
const usuariosController = new UsuariosController(); // Crear instancia del controlador

// Rutas para usuarios
router.get('/usuarios', usuariosController.findAll); // Cambiar de getAllUsers a findAll
router.get('/usuarios/:id', usuariosController.findById); // Cambiar de getUserById a findById
router.post('/usuarios', usuariosController.create); // Cambiar de createUser a create
router.put('/usuarios/:id', usuariosController.update); // Cambiar de updateUser a update
router.delete('/usuarios/:id', usuariosController.destroy); // Cambiar de deleteUser a destroy

export default router;
