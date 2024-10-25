import express from 'express';
import { getAllUsuariosOficinas, getUsuariosOficinaById, createUsuariosOficina, updateUsuariosOficina, deleteUsuariosOficina } from '../controllers/usuariosOficinasController.js';

const router = express.Router();

// Rutas para la relación Usuarios-Oficinas
router.get('/usuariosOficinas', getAllUsuariosOficinas);
router.get('/usuariosOficinas/:id', getUsuariosOficinaById);
router.post('/usuariosOficinas', createUsuariosOficina);
router.put('/usuariosOficinas/:id', updateUsuariosOficina);
router.delete('/usuariosOficinas/:id', deleteUsuariosOficina);

export default router;
