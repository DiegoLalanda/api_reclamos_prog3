import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Reclamo = sequelize.define('Reclamo', {
  idReclamo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
    defaultValue: DataTypes.NOW,
  },
  fechaFinalizado: {
    type: DataTypes.DATE,
  },
  fechaCancelado: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'reclamos',
  timestamps: false,
});

export default Reclamo;