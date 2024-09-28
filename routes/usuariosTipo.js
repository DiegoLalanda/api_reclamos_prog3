import express from 'express';
import UsuariosTipoController from '../controllers/usuariosTipoController.js';

const router = express.Router();
const usuariosTipoController = new UsuariosTipoController();

// Definir las rutas y vincularlas a los métodos del controlador
router.get('/rol', usuariosTipoController.getAllUsuariosTipo);
router.get('/rol/:id', usuariosTipoController.getUsuarioTipoById);
router.post('/rol', usuariosTipoController.createUsuarioTipo);
router.put('/rol/:id', usuariosTipoController.updateUsuarioTipo);
router.delete('/rol/:id', usuariosTipoController.deleteUsuarioTipo);

export default router;
