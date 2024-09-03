const express = require('express');
const app = express();
const sequelize = require('./config/db');
const usuarioRoutes = require ('./routes/roltipo.routes');
app.use(express.json());

app.use('/api/usuariosTipo', usuarioRoutes)




// Sincronizar la base de datos
sequelize.sync()
  .then(() => console.log('Base de datos sincronizada.'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
