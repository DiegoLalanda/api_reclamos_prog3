import db from '../models/index.js';
const { ReclamoEstado } = db;

export default class ReclamosEstadoService {
    async findAll() {
        return await ReclamoEstado.findAll();
    }
    async findById(id) {
        return await ReclamoEstado.findByPk(id);
    }
    async create(reclamoEstado) {
        return await ReclamoEstado.create(reclamoEstado);
    }
    async update(id, reclamoEstado) {
        await ReclamoEstado.update(reclamoEstado, { where: { idReclamoEstado: id } });
        return this.findById(id);
    }
    async delete(id) {
        return await ReclamoEstado.destroy({ where: { idReclamoEstado: id } });
    }
}