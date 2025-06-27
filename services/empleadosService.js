import db from '../models/index.js';
import { Op } from 'sequelize';

const { Usuario } = db;
const TIPO_USUARIO_EMPLEADO = 2;

export default class EmpleadosServices {
  async findAll(filters, limit = 10, offset = 0, order = 'idUsuario', asc = true) {
    const { nombre, apellido } = filters;
    const whereClause = {
      idTipoUsuario: TIPO_USUARIO_EMPLEADO,
      activo: true,
    };

    if (nombre) whereClause.nombre = { [Op.iLike]: `%${nombre}%` };
    if (apellido) whereClause.apellido = { [Op.iLike]: `%${apellido}%` };

    return await Usuario.findAll({
      where: whereClause,
      limit,
      offset,
      order: [[order, asc ? 'ASC' : 'DESC']],
    });
  }

  async findById(id) {
    return await Usuario.findOne({
      where: {
        idUsuario: id,
        idTipoUsuario: TIPO_USUARIO_EMPLEADO,
      },
    });
  }

  async findByEmail(correoElectronico) {
    return await Usuario.findOne({
      where: {
        correoElectronico,
        idTipoUsuario: TIPO_USUARIO_EMPLEADO,
      },
    });
  }

  async create(empleado) {
    // El hook en el modelo Usuario se encarga de hashear la contraseña
    return await Usuario.create({
      ...empleado,
      idTipoUsuario: TIPO_USUARIO_EMPLEADO,
    });
  }

  async update(id, empleado) {
    await Usuario.update(empleado, {
      where: {
        idUsuario: id,
        idTipoUsuario: TIPO_USUARIO_EMPLEADO,
      },
    });
    return this.findById(id);
  }

  async destroy(id) {
    // Borrado lógico
    const [updatedRows] = await Usuario.update({ activo: false }, {
      where: {
        idUsuario: id,
        idTipoUsuario: TIPO_USUARIO_EMPLEADO,
      },
    });
    return updatedRows > 0 ? { message: "Empleado desactivado correctamente." } : null;
  }
}