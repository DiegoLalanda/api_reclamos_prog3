import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const UsuarioOficina = sequelize.define('UsuarioOficina', {
  idUsuarioOficina: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'usuariosOficinas',
  timestamps: false,
});

export default UsuarioOficina;