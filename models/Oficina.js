import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Oficina = sequelize.define('Oficina', {
  idOficina: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'oficinas',
  timestamps: false,
});

export default Oficina;