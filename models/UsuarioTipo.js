const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UsuarioTipo = sequelize.define('UsuarioTipo', {
  idUsuarioTipo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UsuarioTipo;
