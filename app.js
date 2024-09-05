const express = require('express');
const app = express();
const sequelize = require('./config/db');
const rutas = require('./routes');

// Middlewares
app.use(express.json());

// Rutas
app.use('/', rutas);

// Sincronizar la base de datos
sequelize.sync()
  .then(() => console.log('Base de datos sincronizada.'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});