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
            
            res.status(200).json({ status: "OK", data: { token, user } });
        } catch (error) {
            res.status(error?.status || 500).json({ status: "Fallo", data: { error: error?.message || error } });
        }
    };
}