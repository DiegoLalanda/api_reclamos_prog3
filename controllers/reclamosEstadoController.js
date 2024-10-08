import ReclamosEstadoService from '../services/reclamosEstadoService.js';

const reclamosEstadoService = new ReclamosEstadoService();

export const getAllReclamosEstado = async (req, res) => {
    try {
        const reclamosEstado = await reclamosEstadoService.findAll();
        res.status(200).json(reclamosEstado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getReclamosEstadoById = async (req, res) => {
    try {
        const { id } = req.params;
        const reclamoEstado = await reclamosEstadoService.findById(id);
        if (reclamoEstado) {
            res.status(200).json(reclamoEstado);
        } else {
            res.status(404).json({ message: `Reclamo Estado con id ${id} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createReclamosEstado = async (req, res) => {
    try {
        const { descripcion } = req.body;
        await reclamosEstadoService.create({ descripcion });
        res.status(201).json({ message: 'Reclamo Estado creado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateReclamosEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion } = req.body;
        await reclamosEstadoService.update(id, { descripcion });
        res.status(200).json({ message: `Reclamo Estado con id ${id} actualizado correctamente` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteReclamosEstado = async (req, res) => {
    try {
        const { id } = req.params;
        await reclamosEstadoService.delete(id);
        res.status(200).json({ message: `Reclamo Estado con id ${id} eliminado correctamente` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
