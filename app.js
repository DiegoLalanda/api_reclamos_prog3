import express from 'express';
import connectToDatabase from './config/db.js'; // Cambia a 'import'
import rutas from './routes/index.js';
import passportConfig from './config/passport.js'; // Asegúrate de importar tu configuración
import passport from 'passport';
import cookieParser from 'cookie-parser'; // Importar cookie-parser


const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser()); // Usar cookie-parser
app.use(passport.initialize()); // Inicializa passport

// Configura passport
passportConfig(passport);

// Rutas
app.use('/', rutas);

// Conectar a la base de datos
connectToDatabase().catch((err) => {
    console.error('Error en la conexión a la base de datos:', err);
    process.exit(1); // Finaliza el proceso si hay un error en la conexión
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
