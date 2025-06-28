import express from 'express';
import db from './models/index.js';
import rutas from './routes/index.js';
import passportConfig from './config/passport.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { seedDatabase } from './config/seed.js';
import cors from 'cors'; // <-- 1. IMPORTAR CORS

const app = express();

// --- CONFIGURACIÓN DE CORS ---
// Lista de orígenes permitidos. Añade aquí la URL de tu portfolio cuando la tengas.
const whitelist = [
    'http://localhost:3000', // Para desarrollo local
    'https://api-reclamos-prog3.onrender.com', // Tu propia API (para Swagger)
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite peticiones sin 'origin' (como las de Postman o apps móviles)
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Permite que se envíen cookies
};

// 2. USAR EL MIDDLEWARE DE CORS
app.use(cors(corsOptions));


// --- RESTO DE MIDDLEWARES ---
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Configura passport
passportConfig(passport);

// Rutas de la API
app.use('/', rutas);

const PORT = process.env.PORT || 3000;

// Sincronizar la base de datos y arrancar el servidor
const startServer = async () => {
    try {
        await db.sequelize.sync({ alter: true });
        console.log('Base de datos sincronizada correctamente.');

        // ¡NUEVA LÍNEA! Ejecutamos el seeder aquí.
        await seedDatabase();

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
            console.log(`Documentación de la API disponible en http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('Error al conectar, sincronizar o sembrar la base de datos:', error);
        process.exit(1);
    }
};

startServer();