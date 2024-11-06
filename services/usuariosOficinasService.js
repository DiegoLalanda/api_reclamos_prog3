// services/usuariosOficinasService.js
import UsuariosOficinasData from '../database/usuariosOficinasData.js';

export default class UsuariosOficinasService {
    // Obtener todas las relaciones de usuarios y oficinas
    async findAll() {
        return await UsuariosOficinasData.findAll();
    }

    // Obtener una relación usuario-oficina por ID
    async findById(id) {
        return await UsuariosOficinasData.findById(id);
    }

    // Crear una nueva relación usuario-oficina
    async create(usuariosOficinas) {
        const { idUsuario, idOficina, activo } = usuariosOficinas;
        await UsuariosOficinasData.create(idUsuario, idOficina, activo);
    }

    // Actualizar una relación usuario-oficina
    async update(id, usuariosOficinas) {
        const { idUsuario, idOficina, activo } = usuariosOficinas;
        await UsuariosOficinasData.update(id, idUsuario, idOficina, activo);
    }

    // Eliminar una relación usuario-oficina
    async delete(id) {
        await UsuariosOficinasData.delete(id);
    }
}
