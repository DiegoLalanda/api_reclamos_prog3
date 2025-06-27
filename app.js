import express from 'express';
import db from './models/index.js';
import rutas from './routes/index.js';
import passportConfig from './config/passport.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './config/swagger.js';
import { seedDatabase } from './config/seed.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Configura passport
passportConfig(passport);

// Rutas de la API
app.use('/', rutas);

// Ruta para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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