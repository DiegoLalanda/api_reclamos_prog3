const Usuario = require('./Usuario');
const Reclamo = require('./Reclamo');
const Oficina = require('./Oficina');
const UsuarioTipo = require('./UsuarioTipo');
const UsuarioOficina = require('./UsuarioOficina');
const ReclamoTipo = require('./ReclamoTipo');
const ReclamoEstado = require('./ReclamoEstado');
// Agrega más modelos si es necesario

const db = {
  Usuario,
  Reclamo,
  Oficina,
  UsuarioTipo,
  UsuarioOficina,
  ReclamoTipo,
  ReclamoEstado
  // Agrega más modelos si es necesario
};

module.exports = db;
