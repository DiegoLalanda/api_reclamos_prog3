import UsuariosOficinasService from '../services/usuariosOficinasService.js';

const usuariosOficinasService = new UsuariosOficinasService();

export const getAllUsuariosOficinas = async (req, res) => {
    try {
        const usuariosOficinas = await usuariosOficinasService.findAll();
        res.status(200).json(usuariosOficinas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsuariosOficinaById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioOficina = await usuariosOficinasService.findById(id);
        if (usuarioOficina) {
            res.status(200).json(usuarioOficina);
        } else {
            res.status(404).json({ message: `Relación Usuario-Oficina con id ${id} no encontrada` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUsuariosOficina = async (req, res) => {
    try {
        const { idUsuario, idOficina, activo } = req.body;
        await usuariosOficinasService.create({ idUsuario, idOficina, activo });
        res.status(201).json({ message: 'Relación Usuario-Oficina creada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUsuariosOficina = async (req, res) => {
    try {
        const { id } = req.params;
        const { idUsuario, idOficina, activo } = req.body;
        await usuariosOficinasService.update(id, { idUsuario, idOficina, activo });
        res.status(200).json({ message: `Relación Usuario-Oficina con id ${id} actualizada correctamente` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUsuariosOficina = async (req, res) => {
    try {
        const { id } = req.params;
        await usuariosOficinasService.delete(id);
        res.status(200).json({ message: `Relación Usuario-Oficina con id ${id} eliminada correctamente` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
