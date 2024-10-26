// services/reclamosTipoService.js
import ReclamosTipoData from '../database/reclamosTipoData.js';

export default class ReclamosTipoService {
    async findAll() {
        return await ReclamosTipoData.findAll();
    }

    async findById(id) {
        return await ReclamosTipoData.findById(id);
    }

    async create(reclamoTipo) {
        await ReclamosTipoData.create(reclamoTipo);
    }

    async update(id, reclamoTipo) {
        await ReclamosTipoData.update(id, reclamoTipo);
    }

    async updateStatus(id, activo) {
        await ReclamosTipoData.updateStatus(id, activo);
    }
}
