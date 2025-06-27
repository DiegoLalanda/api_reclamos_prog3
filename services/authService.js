import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '2h';

export default class AuthService {
    constructor(userService) {
        this.userService = userService;
    }

    async login(email, password) {
        const user = await this.userService.findByEmail(email);
    
        if (!user) {
            throw { status: 404, message: 'Usuario no encontrado.' };
        }
    
        //Usamos el método del modelo de Sequelize para validar la contraseña
        const isPasswordValid = await user.validarContrasenia(password); 
    
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
    
        // Devolvemos la instancia de Sequelize, que es un objeto con más métodos.
        // Usamos .get({ plain: true }) para obtener un objeto JSON simple.
        return { token, user: user.get({ plain: true }) };
    }    

    verifyToken(token) {
        try {
            return jwt.verify(token, SECRET_KEY);
        } catch (error) {
            throw { status: 401, message: 'Token inválido o expirado.' };
        }
    }
}