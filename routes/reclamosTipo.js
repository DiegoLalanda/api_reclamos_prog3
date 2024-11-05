import express from 'express';
import { 
    getAllReclamosTipo, 
    getReclamosTipoById, 
    createReclamosTipo, 
    updateReclamosTipo, 
} from '../controllers/reclamosTipoController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';
import { createReclamosTipoValidator, updateReclamosTipoValidator } from '../validators/reclamoTipoValidator.js';
import protectedRoutes from '../utils/protectedRoutes.js';

const router = express.Router();

// Rutas para tipos de reclamos protegidas
protectedRoutes.get('/reclamosTipo', isAdmin, getAllReclamosTipo);

protectedRoutes.get('/reclamosTipo/:id', isAdmin, getReclamosTipoById);

protectedRoutes.post('/reclamosTipo', 
    isAdmin, 
    createReclamosTipoValidator, 
    errorMiddleware,       
    createReclamosTipo
);

protectedRoutes.put('/reclamosTipo/:id', 
    isAdmin, 
    updateReclamosTipoValidator, 
    errorMiddleware,       
    updateReclamosTipo
);

router.use('/secure', protectedRoutes);

export default router;
