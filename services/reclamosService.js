// services/reclamoService.js
import ReclamosData from '../database/reclamosData.js';

export default class ReclamoService {
    async findById(idReclamo) {
        return await ReclamosData.findById(idReclamo);
    }

    async findAll() {
        return await ReclamosData.findAll();
    }

    async create(asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) {
        await ReclamosData.create(asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador);
    }

    async update(idReclamo, asunto, descripcion) {
        await ReclamosData.update(idReclamo, asunto, descripcion);
    }

    async updateEstado(idReclamo, nuevoEstado) {
        await ReclamosData.updateEstado(idReclamo, nuevoEstado);
    }

    async findUsuarioById(idUsuario) {
        return await ReclamosData.findUsuarioById(idUsuario);
    }

    async getEstadoDescripcion(idReclamoEstado) {
        return await ReclamosData.getEstadoDescripcion(idReclamoEstado);
    }

    async getTipoDescripcion(idReclamoTipo) {
        return await ReclamosData.getTipoDescripcion(idReclamoTipo);
    }

    async cancelarReclamo(idReclamo) {
        await ReclamosData.cancelarReclamo(idReclamo); 
    }
    
    async findByOficina(idOficina) {
        return await ReclamosData.findByOficina(idOficina); 
    }
}
