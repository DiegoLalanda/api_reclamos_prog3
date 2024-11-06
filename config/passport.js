import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'; 
import UsuariosServices from '../services/usuariosService.js';

const SECRET_KEY = process.env.SECRET_KEY;

const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Para obtener el JWT del encabezado de autorización
        (req) => {
            // También puedes usar la cookie
            return req.cookies.token; // Cambiar según tu implementación
        }
    ]),
    secretOrKey: SECRET_KEY,
};

const passportConfig = (passport) => {
    passport.use(
        new JwtStrategy(options, async (jwtPayload, done) => {
            try {
                const usuariosService = new UsuariosServices();
                const user = await usuariosService.findById(jwtPayload.idUsuario);

                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error, false);
            }
        })
    );
};

export default passportConfig;
