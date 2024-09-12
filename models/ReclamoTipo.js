// models/ReclamoTipo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ReclamoTipo = sequelize.define('ReclamoTipo', {
  idReclamoTipo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  descripcion: DataTypes.STRING,
  activo: DataTypes.BOOLEAN
}, {
  tableName: 'reclamosTipo', // Nombre de la tabla en la base de datos
  timestamps: false
});

module.exports = ReclamoTipo;