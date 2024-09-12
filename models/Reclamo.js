const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ReclamoTipo = require('./ReclamoTipo');
const ReclamoEstado = require('./ReclamoEstado');
const Usuario = require('./Usuario');

const Reclamo = sequelize.define('Reclamo', {
  idReclamo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  asunto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  fechaCreado: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaFinalizado: {
    type: DataTypes.DATE,
  },
  fechaCancelado: {
    type: DataTypes.DATE,
  },
  idReclamoEstado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idReclamoTipo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idUsuarioCreador: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idUsuarioFinalizador: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: false, // Desactiva los timestamps
});

Reclamo.belongsTo(ReclamoTipo, { foreignKey: 'idReclamoTipo', as: 'tipo' });
Reclamo.belongsTo(ReclamoEstado, { foreignKey: 'idReclamoEstado', as: 'estado' });
Reclamo.belongsTo(Usuario, { foreignKey: 'idUsuarioCreador', as: 'creador' });
Reclamo.belongsTo(Usuario, { foreignKey: 'idUsuarioFinalizador', as: 'finalizador' });

module.exports = Reclamo;
