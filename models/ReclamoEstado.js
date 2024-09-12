// models/ReclamoEstado.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ReclamoEstado = sequelize.define('ReclamoEstado', {
  idReclamoEstado: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  descripcion: DataTypes.STRING
}, {
  tableName: 'reclamosEstado', // Nombre de la tabla en la base de datos
  timestamps: false
});

module.exports = ReclamoEstado;