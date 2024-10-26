import express from 'express';
import passport from 'passport'; // Importar passport
import { 
    getAllOficinas, 
    getOficinaById, 
    createOficina, 
    updateOficina 
} from '../controllers/oficinasController.js';
import { createOficinaValidator, updateOficinaValidator } from '../validators/oficinaValidator.js';
import {isAdmin} from '../middlewares/authMiddleware.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';

const router = express.Router();

// Rutas para oficinas
router.get(
    '/oficinas', 
    passport.authenticate('jwt', { session: false }), // Autenticación con JWT
    isAdmin, 
    getAllOficinas
);

router.get(
    '/oficinas/:id', 
    passport.authenticate('jwt', { session: false }), // Autenticación con JWT
    isAdmin, 
    getOficinaById
);

router.post(
    '/oficinas', 
    passport.authenticate('jwt', { session: false }), // Autenticación con JWT
    isAdmin, 
    createOficinaValidator, 
    errorMiddleware, 
    createOficina
);

router.put(
    '/oficinas/:id', 
    passport.authenticate('jwt', { session: false }), // Autenticación con JWT
    isAdmin, 
    updateOficinaValidator, 
    errorMiddleware, 
    updateOficina
);

export default router;
