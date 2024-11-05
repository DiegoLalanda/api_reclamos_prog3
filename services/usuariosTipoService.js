// services/usuariosTipoService.js
import UsuariosTipoData from '../database/usuariosTipoData.js';

export default class UsuariosTipoService {
    // Obtener todos los tipos de usuario
    async findAll() {
        return await UsuariosTipoData.findAll();
    }

    // Obtener un tipo de usuario por ID
    async findById(id) {
        return await UsuariosTipoData.findById(id);
    }

    // Crear un nuevo tipo de usuario
    async create(usuarioTipo) {
        const { descripcion, activo } = usuarioTipo;
        return await UsuariosTipoData.create(descripcion, activo);
    }

    // Actualizar un tipo de usuario
    async update(id, usuarioTipo) {
        const { descripcion, activo } = usuarioTipo;
        await UsuariosTipoData.update(id, descripcion, activo);
        return await this.findById(id); // Retorna el tipo de usuario actualizado
    }

    // Eliminar un tipo de usuario
    async destroy(id) {
        await UsuariosTipoData.destroy(id);
    }
}
