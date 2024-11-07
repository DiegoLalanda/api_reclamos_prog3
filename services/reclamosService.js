import ReclamosData from '../database/reclamosData.js';

export default class ReclamoService {
    async findById(idReclamo) {
        return await ReclamosData.findById(idReclamo);
    }

    async findByIdAndCreador(idReclamo, idCreador) {
        try {
            const reclamo = await ReclamosData.findById(idReclamo);
            if (!reclamo) {
                return null;
            }
    
            if (reclamo.idUsuarioCreador !== idCreador) {
                return null;
            }
    
            return reclamo;
        } catch (error) {
            return null;
        }
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

    async cancelarReclamo(idReclamo, idUsuarioCancelador) {
        await ReclamosData.cancelarReclamo(idReclamo, idUsuarioCancelador);
    }

    // Obtener la oficina asociada a un empleado
    async getOficinaByEmpleado(idEmpleado) {
        try {
            return await ReclamosData.getOficinaByEmpleado(idEmpleado);
        } catch (error) {
            throw new Error('Error al obtener la oficina del empleado');
        }
    }

    // Método para obtener los reclamos por oficina
    async findByOficina(idOficina) {
        try {
            const reclamos = await ReclamosData.findByOficina(idOficina);
            return reclamos;
        } catch (error) {
            throw new Error('Error al obtener los reclamos de la oficina');
        }
    } 
}
