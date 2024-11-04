import express from 'express';
import { 
    getAllOficinas, 
    getOficinaById, 
    createOficina, 
    updateOficina 
} from '../controllers/oficinasController.js';
import { createOficinaValidator, updateOficinaValidator } from '../validators/oficinaValidator.js';
import {isAdmin} from '../middlewares/authMiddleware.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';
import protectedRoutes from '../utils/protectedRoutes.js';

const router = express.Router();

// Rutas para oficinas
protectedRoutes.get('/oficinas', isAdmin, getAllOficinas);

protectedRoutes.get('/oficinas/:id', isAdmin, getOficinaById);

protectedRoutes.post(
    '/oficinas',
    isAdmin, 
    createOficinaValidator, 
    errorMiddleware, 
    createOficina
);

protectedRoutes.put(
    '/oficinas/:id', 
    isAdmin, 
    updateOficinaValidator, 
    errorMiddleware, 
    updateOficina
);

router.use('/secure', protectedRoutes);

export default router;
