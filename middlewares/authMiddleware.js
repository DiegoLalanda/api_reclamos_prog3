import UsuariosServices from '../services/usuariosService.js';

const isAdmin = async (req, res, next) => {
    try {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            return res.status(401).json({
                status: 'Fallo',
                data: { error: 'No autenticado.' }
            });
        }

        const { idUsuario } = req.user;
        const usuariosService = new UsuariosServices();
        const user = await usuariosService.findById(idUsuario);

        if (user?.idTipoUsuario === 1) { 
            return next();
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


const isEmployee = (req, res, next) => {
    if (req.user.idUsuarioTipo  !== '2') {
        return res.status(403).json({ 
            status: 'Fallo', 
            data: { error: 'Acceso denegado. Solo empleados pueden acceder a esta ruta.' } 
        });
    }
    next();
};

const isClient = (req, res, next) => {
    if (req.user.idUsuarioTipo  !== '3') {
        return res.status(403).json({ 
            status: 'Fallo', 
            data: { error: 'Acceso denegado. Solo clientes pueden acceder a esta ruta.' } 
        });
    }
    next();
};


export { isAdmin, isEmployee, isClient };