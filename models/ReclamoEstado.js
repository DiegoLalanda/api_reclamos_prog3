import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ReclamoEstado = sequelize.define('ReclamoEstado', {
  idReclamoEstado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'reclamosEstado',
  timestamps: false,
});

export default ReclamoEstado;