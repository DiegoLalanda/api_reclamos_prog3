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
            
            // 1. Configurar la cookie del token JWT (se mantiene, es bueno para frontends)
            res.cookie('token', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', // true en producción
                sameSite: 'strict', // Mejora la seguridad
                maxAge: 1000 * 60 * 60 * 2 // 2 horas
            });

            // 2. ¡CAMBIO CLAVE! Devolver también el token en el cuerpo de la respuesta.
            //    Y quitamos la contraseña del objeto 'user' que se devuelve.
            const { contrasenia: _, ...userWithoutPassword } = user;

            res.status(200).json({ 
                status: "OK", 
                data: {
                    message: "Login exitoso. Usa este token para autorizarte en Swagger.",
                    token: token, // <-- Aquí está el token
                    user: userWithoutPassword 
                }
            });
        } catch (error) {
            res.status(error?.status || 500).json({ status: "Fallo", data: { error: error?.message || error } });
        }
    };

    logout = (req, res) => {
        res.clearCookie('token'); // Eliminar la cookie
        res.status(200).json({ status: "OK", data: { message: "Sesión cerrada exitosamente." } });
    };
}