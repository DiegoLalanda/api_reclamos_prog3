import UsuariosData from '../database/usuariosData.js';

export default class UsuariosServices {
    async findAll(filters, limit = 0, offset = 0, order = 'idUsuario', asc = true) {
        return await UsuariosData.findAll(filters, limit, offset, order, asc);
    }

    async findById(id) {
        return await UsuariosData.findById(id);
    }

    async findByEmail(correoElectronico) {
        return await UsuariosData.findByEmail(correoElectronico);
    }

    async create(user) {
        return await UsuariosData.create(user);
    }

    async update(id, user) {
        return await UsuariosData.update(id, user);
    }
    
    async destroy(id) {
        return await UsuariosData.destroy(id);
    }
}
