const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UsuariosTipo = sequelize.define('usuariosTipo', {
  idUsuarioTipo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descripcion: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  activo: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
});

module.exports = UsuariosTipo;
