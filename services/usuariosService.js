import db from '../models/index.js';
import { Op } from 'sequelize';
const { Usuario } = db;

// Ya no necesitamos la constante TIPO_USUARIO_CLIENTE aquí
// const TIPO_USUARIO_CLIENTE = 3;

export default class UsuariosServices {
    async findAll(filters, limit = 10, offset = 0, order = 'idUsuario', asc = true) {
        const { nombre, apellido } = filters;
        // El filtro por tipo de usuario ahora se debe aplicar en el controlador si es necesario
        const whereClause = { activo: true }; 
        if (nombre) whereClause.nombre = { [Op.iLike]: `%${nombre}%` };
        if (apellido) whereClause.apellido = { [Op.iLike]: `%${apellido}%` };

        // Modificamos el findAll para que pueda opcionalmente filtrar por idTipoUsuario
        if (filters.idTipoUsuario) {
            whereClause.idTipoUsuario = filters.idTipoUsuario;
        }

        return await Usuario.findAll({ where: whereClause, limit, offset, order: [[order, asc ? 'ASC' : 'DESC']] });
    }

    async findById(id) {
        return await Usuario.findByPk(id);
    }

    async findByEmail(correoElectronico) {
        return await Usuario.findOne({ where: { correoElectronico } });
    }

    async create(user) {
        // El hook del modelo se encargará de hashear la contraseña.
        return await Usuario.create(user);
    }

    async update(id, user) {
        await Usuario.update(user, { where: { idUsuario: id } });
        return this.findById(id);
    }
    
    async destroy(id) {
        return await Usuario.update({ activo: false }, { where: { idUsuario: id } });
    }
}