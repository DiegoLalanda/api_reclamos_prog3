import db from '../models/index.js';
const { ReclamoTipo } = db;

export default class ReclamosTipoService {
    async findAll() {
        return await ReclamoTipo.findAll();
    }
    async findById(id) {
        return await ReclamoTipo.findByPk(id);
    }
    async create(reclamoTipo) {
        return await ReclamoTipo.create(reclamoTipo);
    }
    async update(id, reclamoTipo) {
        await ReclamoTipo.update(reclamoTipo, { where: { idReclamoTipo: id } });
        return this.findById(id);
    }
    async exists(id) {
        const count = await ReclamoTipo.count({ where: { idReclamoTipo: id } });
        return count > 0;
    }
}