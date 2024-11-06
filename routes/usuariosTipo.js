import express from 'express';
import UsuariosTipoController from '../controllers/usuariosTipoController.js';
import protectedRoutes from '../utils/protectedRoutes.js';

const router = express.Router();
const usuariosTipoController = new UsuariosTipoController();

// Definir las rutas y vincularlas a los métodos del controlador
protectedRoutes.get('/rol', usuariosTipoController.getAllUsuariosTipo);
protectedRoutes.get('/rol/:id', usuariosTipoController.getUsuarioTipoById);
protectedRoutes.post('/rol', usuariosTipoController.createUsuarioTipo);
protectedRoutes.put('/rol/:id', usuariosTipoController.updateUsuarioTipo);
protectedRoutes.delete('/rol/:id', usuariosTipoController.deleteUsuarioTipo);

router.use('/secure', protectedRoutes);

export default router;
