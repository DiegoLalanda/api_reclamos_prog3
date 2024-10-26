import jwt from 'jsonwebtoken';
import passport from 'passport';
import UsuariosServices from '../services/usuariosService.js';

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies.token; // Intentar obtener el token de las cookies si no está en los encabezados

    if (!token) {
        return res.status(403).json({ 
            status: 'Fallo', 
            data: { error: 'No se ha proporcionado token.' } 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  
        next();
    } catch (error) {
        return res.status(401).json({ 
            status: 'Fallo', 
            data: { error: 'Token inválido o expirado.' } 
        });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            return res.status(401).json({
                status: 'Fallo',
                data: { error: 'No autenticado.' }
            });
        }

        const { idUsuario } = req.user; // Desestructuramos el idUsuario
        const usuariosService = new UsuariosServices();
        const user = await usuariosService.findById(idUsuario);

        if (user?.idTipoUsuario === 1) { // Usamos el operador de encadenamiento opcional
            return next(); // El usuario es administrador, puede continuar
        }

        return res.status(403).json({
            status: 'Fallo',
            data: { error: 'Acceso denegado. Solo administradores pueden acceder a esta ruta.' }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'Fallo',
            data: { error: 'Error del servidor.' }
        });
    }
};


// Middleware para verificar si el usuario es empleado
const isEmployee = (req, res, next) => {
    if (req.user.idUsuarioTipo  !== '2') {
        return res.status(403).json({ 
            status: 'Fallo', 
            data: { error: 'Acceso denegado. Solo empleados pueden acceder a esta ruta.' } 
        });
    }
    next();
};

// Middleware para verificar si el usuario es cliente
const isClient = (req, res, next) => {
    if (req.user.idUsuarioTipo  !== '3') {
        return res.status(403).json({ 
            status: 'Fallo', 
            data: { error: 'Acceso denegado. Solo clientes pueden acceder a esta ruta.' } 
        });
    }
    next();
};


export { verifyToken, isAdmin, isEmployee, isClient };