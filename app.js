import express from 'express';
import connectToDatabase from './config/db.js'; // Cambia a 'import'
import rutas from './routes/index.js';

const app = express();

// Middlewares
app.use(express.json());

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
