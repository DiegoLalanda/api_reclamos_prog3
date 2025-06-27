import db from '../models/index.js';
const { UsuarioOficina } = db;

export default class UsuariosOficinasService {
    async findAll() {
        return await UsuarioOficina.findAll();
    }
    async findById(id) {
        return await UsuarioOficina.findByPk(id);
    }
    async create(data) {
        return await UsuarioOficina.create(data);
    }
    async update(id, data) {
        await UsuarioOficina.update(data, { where: { idUsuarioOficina: id } });
        return this.findById(id);
    }
    async delete(id) {
        return await UsuarioOficina.destroy({ where: { idUsuarioOficina: id } });
    }
}