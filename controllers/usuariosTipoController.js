import UsuariosTipoService from '../services/usuariosTipoService.js';

export default class UsuariosTipoController {
    constructor() {
        this.service = new UsuariosTipoService(); // Inicializa el servicio
    }

    // Obtener todos los tipos de usuario
    getAllUsuariosTipo = async (req, res) => {
        try {
            const usuariosTipo = await this.service.findAll();
            res.status(200).json(usuariosTipo);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los tipos de usuario', error });
        }
    };

    // Obtener un tipo de usuario por ID
    getUsuarioTipoById = async (req, res) => {
        try {
            const { id } = req.params;
            const usuarioTipo = await this.service.findById(id);
            if (usuarioTipo) {
                res.status(200).json(usuarioTipo);
            } else {
                res.status(404).json({ message: 'Tipo de usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el tipo de usuario', error });
        }
    };

    // Crear un nuevo tipo de usuario
    createUsuarioTipo = async (req, res) => {
        try {
            const { descripcion, activo } = req.body;
            const nuevoUsuarioTipo = await this.service.create({ descripcion, activo });
            res.status(201).json(nuevoUsuarioTipo);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el tipo de usuario', error });
        }
    };

    // Actualizar un tipo de usuario
    updateUsuarioTipo = async (req, res) => {
        try {
            const { id } = req.params;
            const { descripcion, activo } = req.body;
            const usuarioTipo = await this.service.update(id, { descripcion, activo });
            if (usuarioTipo) {
                res.status(200).json(usuarioTipo);
            } else {
                res.status(404).json({ message: 'Tipo de usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el tipo de usuario', error });
        }
    };

    // Eliminar un tipo de usuario
    deleteUsuarioTipo = async (req, res) => {
        try {
            const { id } = req.params;
            await this.service.destroy(id);
            res.status(204).json(); // No enviar contenido si se elimina correctamente
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el tipo de usuario', error });
        }
    };
}
