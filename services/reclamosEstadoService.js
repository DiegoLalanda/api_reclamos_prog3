// services/reclamosEstadoService.js
import ReclamosEstadoData from '../database/reclamosEstadoData.js';

export default class ReclamosEstadoService {
    async findAll() {
        return await ReclamosEstadoData.findAll();
    }

    async findById(id) {
        return await ReclamosEstadoData.findById(id);
    }

    async create(reclamoEstado) {
        await ReclamosEstadoData.create(reclamoEstado);
    }

    async update(id, reclamoEstado) {
        await ReclamosEstadoData.update(id, reclamoEstado);
    }

    async delete(id) {
        await ReclamosEstadoData.delete(id);
    }
}
