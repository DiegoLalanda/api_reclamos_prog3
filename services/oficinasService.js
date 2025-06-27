import db from '../models/index.js';
const { Oficina } = db;

export default class OficinaService {
    async findAll() {
        return await Oficina.findAll();
    }

    async findById(id) {
        return await Oficina.findByPk(id);
    }

    async create(oficina) {
        return await Oficina.create(oficina);
    }

    async update(id, oficina) {
        await Oficina.update(oficina, { where: { idOficina: id } });
        return this.findById(id);
    }
}