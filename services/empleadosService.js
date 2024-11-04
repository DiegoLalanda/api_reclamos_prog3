import EmpleadosData from '../database/empleadosData.js';

export default class EmpleadosService {
    async findAll(filters, limit = 0, offset = 0, order = 'idUsuario', asc = true) {
        return await EmpleadosData.findAll(filters, limit, offset, order, asc);
    }

    async findById(id) {
        return await EmpleadosData.findById(id);
    }

    async findByEmail(correoElectronico) {
        return await EmpleadosData.findByEmail(correoElectronico);
    }

    async create(empleado) {
        return await EmpleadosData.create(empleado);
    }

    async update(id, empleado) {
        return await EmpleadosData.update(id, empleado);
    }

    async destroy(id) {
        await EmpleadosData.destroy(id);
    }
}