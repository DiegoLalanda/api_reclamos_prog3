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
                httpOnly: true, 
                maxAge: 1000 * 60 * 60 * 2 
            });

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
