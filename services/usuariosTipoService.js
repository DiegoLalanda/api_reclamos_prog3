import db from '../models/index.js';
const { UsuarioTipo } = db;

export default class UsuariosTipoService {
    async findAll() {
        return await UsuarioTipo.findAll();
    }
    async findById(id) {
        return await UsuarioTipo.findByPk(id);
    }
    async create(usuarioTipo) {
        return await UsuarioTipo.create(usuarioTipo);
    }
    async update(id, usuarioTipo) {
        await UsuarioTipo.update(usuarioTipo, { where: { idUsuarioTipo: id } });
        return this.findById(id);
    }
    async destroy(id) {
        return await UsuarioTipo.destroy({ where: { idUsuarioTipo: id } });
    }
}