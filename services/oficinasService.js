// services/oficinaService.js
import OficinasData from '../database/oficinasData.js';

export default class OficinaService {
    async findAll() {
        return await OficinasData.findAll();
    }

    async findById(id) {
        return await OficinasData.findById(id);
    }

    async create(oficina) {
        await OficinasData.create(oficina);
    }

    async update(id, oficina) {
        await OficinasData.update(id, oficina);
    }

    async delete(id) {
        await OficinasData.delete(id);
    }
}
