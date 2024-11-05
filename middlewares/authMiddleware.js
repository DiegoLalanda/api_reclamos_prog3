import UsuariosServices from '../services/usuariosService.js';

const isAdmin = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) {
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

const isEmployee = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({
                status: 'Fallo',
                data: { error: 'No autenticado.' }
            });
        }

        const { idUsuario } = req.user;
        const usuariosService = new UsuariosServices();
        const user = await usuariosService.findById(idUsuario);

        if (user?.idTipoUsuario === 2) { 
            return next();
        }

        return res.status(403).json({
            status: 'Fallo',
            data: { error: 'Acceso denegado. Solo empleados pueden acceder a esta ruta.' }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'Fallo',
            data: { error: 'Error del servidor.' }
        });
    }
};

const isClient = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({
                status: 'Fallo',
                data: { error: 'No autenticado.' }
            });
        }

        const { idUsuario } = req.user;
        const usuariosService = new UsuariosServices();
        const user = await usuariosService.findById(idUsuario);

        if (user?.idTipoUsuario === 3) { 
            return next();
        }

        return res.status(403).json({
            status: 'Fallo',
            data: { error: 'Acceso denegado. Solo clientes pueden acceder a esta ruta.' }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'Fallo',
            data: { error: 'Error del servidor.' }
        });
    }
};

const isAdminOrSelf = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({
                status: 'Fallo',
                data: { error: 'No autenticado.' }
            });
        }

        const { id } = req.params; 
        const { idUsuario } = req.user;
        const usuariosService = new UsuariosServices();
        const user = await usuariosService.findById(idUsuario);

        if (user?.idTipoUsuario === 1) {
            return next(); 
        }

        if (idUsuario === parseInt(id)) {
            return next();
        }

        return res.status(403).json({
            status: 'Fallo',
            data: { error: 'Acceso denegado. Solo administradores o el propio usuario pueden acceder a esta ruta.' }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'Fallo',
            data: { error: 'Error del servidor.' }
        });
    }
};

export { isAdmin, isEmployee, isClient, isAdminOrSelf };
