import express from 'express';
import { getAllUsuariosOficinas, getUsuariosOficinaById, createUsuariosOficina, updateUsuariosOficina, deleteUsuariosOficina } from '../controllers/usuariosOficinasController.js';
import { isAdmin, isEmployee } from '../middlewares/authMiddleware.js';
import protectedRoutes from '../utils/protectedRoutes.js';

const router = express.Router();

// Rutas para la relación Usuarios-Oficinas
protectedRoutes.get('/usuariosOficinas', isAdmin, getAllUsuariosOficinas);
protectedRoutes.get('/usuariosOficinas/:id', isEmployee, getUsuariosOficinaById);
protectedRoutes.post('/usuariosOficinas', isAdmin, createUsuariosOficina);
protectedRoutes.put('/usuariosOficinas/:id', isAdmin, updateUsuariosOficina);
protectedRoutes.delete('/usuariosOficinas/:id', isAdmin, deleteUsuariosOficina);

router.use('/secure', protectedRoutes);

export default router;
