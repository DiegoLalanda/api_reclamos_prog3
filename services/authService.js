import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '2h';

export default class AuthService {
    constructor(userService) {
        this.userService = userService;
    }

    // Autenticar usuario y generar JWT
    async login(email, password) {
        const user = await this.userService.findByEmail(email);
    
        if (!user) {
            throw { status: 404, message: 'Usuario no encontrado.' };
        }
    
        // Verifica la contraseña con el hash almacenado
        const isPasswordValid = await bcrypt.compare(password, user.contrasenia); 
    
        if (!isPasswordValid) {
            throw { status: 401, message: 'Contraseña incorrecta.' };
        }
    
        // Generar token JWT
        const token = jwt.sign(
            {
                idUsuario: user.idUsuario,
                idTipoUsuario: user.idTipoUsuario,
                nombre: user.nombre,
                apellido: user.apellido,
            },
            SECRET_KEY,
            { expiresIn: TOKEN_EXPIRATION }
        );
    
        return { token, user };
    }    

    // Verificar JWT
    verifyToken(token) {
        try {
            return jwt.verify(token, SECRET_KEY);
        } catch (error) {
            throw { status: 401, message: 'Token inválido o expirado.' };
        }
    }
}