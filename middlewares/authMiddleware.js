import jwt from 'jsonwebtoken';

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

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

// Middleware para verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
    if (req.user.tipoUsuario !== 'admin') {
        return res.status(403).json({ 
            status: 'Fallo', 
            data: { error: 'Acceso denegado. Solo administradores pueden acceder a esta ruta.' } 
        });
    }
    next();
};

// Middleware para verificar si el usuario es empleado
const isEmployee = (req, res, next) => {
    if (req.user.tipoUsuario !== 'empleado') {
        return res.status(403).json({ 
            status: 'Fallo', 
            data: { error: 'Acceso denegado. Solo empleados pueden acceder a esta ruta.' } 
        });
    }
    next();
};

// Middleware para verificar si el usuario es cliente
const isClient = (req, res, next) => {
    if (req.user.tipoUsuario !== 'cliente') {
        return res.status(403).json({ 
            status: 'Fallo', 
            data: { error: 'Acceso denegado. Solo clientes pueden acceder a esta ruta.' } 
        });
    }
    next();
};

export { verifyToken, isAdmin, isEmployee, isClient };