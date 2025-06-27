import sequelize from '../config/db.js';
import Usuario from './Usuario.js';
import UsuarioTipo from './UsuarioTipo.js';
import Reclamo from './Reclamo.js';
import ReclamoTipo from './ReclamoTipo.js';
import ReclamoEstado from './ReclamoEstado.js';
import Oficina from './Oficina.js';
import UsuarioOficina from './UsuarioOficina.js';

// Definir Relaciones

// Usuario <-> UsuarioTipo
UsuarioTipo.hasMany(Usuario, { foreignKey: 'idTipoUsuario' });
Usuario.belongsTo(UsuarioTipo, { foreignKey: 'idTipoUsuario' });

// Reclamo <-> Usuario (Creador y Finalizador)
Usuario.hasMany(Reclamo, { foreignKey: 'idUsuarioCreador', as: 'reclamosCreados' });
Reclamo.belongsTo(Usuario, { foreignKey: 'idUsuarioCreador', as: 'creador' });

Usuario.hasMany(Reclamo, { foreignKey: 'idUsuarioFinalizador', as: 'reclamosFinalizados' });
Reclamo.belongsTo(Usuario, { foreignKey: 'idUsuarioFinalizador', as: 'finalizador' });

// Reclamo <-> ReclamoEstado
ReclamoEstado.hasMany(Reclamo, { foreignKey: 'idReclamoEstado' });
Reclamo.belongsTo(ReclamoEstado, { foreignKey: 'idReclamoEstado' });

// Reclamo <-> ReclamoTipo
ReclamoTipo.hasMany(Reclamo, { foreignKey: 'idReclamoTipo' });
Reclamo.belongsTo(ReclamoTipo, { foreignKey: 'idReclamoTipo' });

// Oficina <-> ReclamoTipo
ReclamoTipo.hasMany(Oficina, { foreignKey: 'idReclamoTipo' });
Oficina.belongsTo(ReclamoTipo, { foreignKey: 'idReclamoTipo' });

// Relación muchos a muchos: Usuario <-> Oficina a través de UsuarioOficina
Usuario.belongsToMany(Oficina, { through: UsuarioOficina, foreignKey: 'idUsuario' });
Oficina.belongsToMany(Usuario, { through: UsuarioOficina, foreignKey: 'idOficina' });

const db = {
  sequelize,
  Usuario,
  UsuarioTipo,
  Reclamo,
  ReclamoTipo,
  ReclamoEstado,
  Oficina,
  UsuarioOficina,
};

export default db;