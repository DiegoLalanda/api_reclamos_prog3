const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const UsuarioTipo = require('./UsuarioTipo');

const Usuario = sequelize.define('Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correoElectronico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idTipoUsuario: {
    type: DataTypes.INTEGER,
    references: {
      model: UsuarioTipo,
      key: 'idUsuarioTipo',
    },
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: false, // Desactivar las marcas de tiempo
});

Usuario.belongsTo(UsuarioTipo, { foreignKey: 'idTipoUsuario' });

module.exports = Usuario;
