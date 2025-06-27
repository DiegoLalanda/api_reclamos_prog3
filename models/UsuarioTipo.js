import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

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
}, {
  tableName: 'usuariosTipo',
  timestamps: false,
});

export default UsuarioTipo;