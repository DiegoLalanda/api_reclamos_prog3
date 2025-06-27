import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ReclamoTipo = sequelize.define('ReclamoTipo', {
  idReclamoTipo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'reclamosTipo',
  timestamps: false,
});

export default ReclamoTipo;