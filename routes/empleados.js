import express from 'express';
import EmpleadosController from '../controllers/empleadosController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
import protectedRoutes from '../utils/protectedRoutes.js';
import { createEmpleadoValidator, updateEmpleadoValidator } from '../validators/empleadoValidator.js';

const router = express.Router();
const empleadosController = new EmpleadosController(); 

protectedRoutes.get('/empleados', isAdmin, empleadosController.findAll); 
protectedRoutes.get('/empleados/:id', isAdmin, empleadosController.findById); 
protectedRoutes.post('/empleados', createEmpleadoValidator, isAdmin, empleadosController.create); 
protectedRoutes.put('/empleados/:id', updateEmpleadoValidator, isAdmin, empleadosController.update); 
protectedRoutes.delete('/empleados/:id', isAdmin, empleadosController.destroy);

router.use('/secure', protectedRoutes);

export default router;

