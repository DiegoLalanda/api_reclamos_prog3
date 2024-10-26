import express from 'express';
import passport from 'passport';
import { 
    getAllReclamosTipo, 
    getReclamosTipoById, 
    createReclamosTipo, 
    updateReclamosTipo, 
} from '../controllers/reclamosTipoController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';
import { createReclamosTipoValidator, updateReclamosTipoValidator } from '../validators/reclamoTipoValidator.js';

const router = express.Router();

// Rutas para tipos de reclamos protegidas
router.get('/reclamosTipo', 
    passport.authenticate('jwt', { session: false }), 
    isAdmin, 
    getAllReclamosTipo
);

router.get('/reclamosTipo/:id', 
    passport.authenticate('jwt', { session: false }), 
    isAdmin, 
    getReclamosTipoById
);

router.post('/reclamosTipo', 
    passport.authenticate('jwt', { session: false }), 
    isAdmin, 
    createReclamosTipoValidator, // Validaciones para crear un reclamo
    errorMiddleware,        // Middleware para manejo de errores
    createReclamosTipo
);

router.put('/reclamosTipo/:id', 
    passport.authenticate('jwt', { session: false }), 
    isAdmin, 
    updateReclamosTipoValidator, // Validaciones para actualizar un reclamo
    errorMiddleware,        // Middleware para manejo de errores
    updateReclamosTipo
);
export default router;
