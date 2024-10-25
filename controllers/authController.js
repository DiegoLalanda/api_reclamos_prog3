import AuthService from '../services/authService.js';
import UsuariosServices from '../services/usuariosService.js';

const authService = new AuthService(new UsuariosServices());

export default class AuthController {
    login = async (req, res) => {
        try {
            const { correoElectronico, contrasenia } = req.body || req.query;

            if (!correoElectronico || !contrasenia) {
                return res.status(400).json({ status: "Fallo", data: { error: "Correo electrónico y contraseña son requeridos." } });
            }

            const { token, user } = await authService.login(correoElectronico, contrasenia);
            
            // Configurar la cookie del token JWT
            res.cookie('token', token, {
                httpOnly: true, // Hace que la cookie sea inaccesible desde JavaScript en el navegador
                secure: process.env.NODE_ENV === 'production', // Solo usar en conexiones seguras en producción
                maxAge: 1000 * 60 * 60 * 2 // Tiempo de expiración, 2 horas (ajustable)
            });

            // Retornar el usuario, puedes incluir el tipo de usuario aquí si lo deseas
            res.status(200).json({ status: "OK", data: { user } });
        } catch (error) {
            res.status(error?.status || 500).json({ status: "Fallo", data: { error: error?.message || error } });
        }
    };

    logout = (req, res) => {
        res.clearCookie('token'); // Eliminar la cookie
        res.status(200).json({ status: "OK", data: { message: "Sesión cerrada exitosamente." } });
    };
}
