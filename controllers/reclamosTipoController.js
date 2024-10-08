import ReclamosTipoService from '../services/reclamosTipoService.js';

const reclamosTipoService = new ReclamosTipoService();

export const getAllReclamosTipo = async (req, res) => {
    try {
        const reclamosTipo = await reclamosTipoService.findAll();
        res.status(200).json(reclamosTipo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getReclamosTipoById = async (req, res) => {
    try {
        const { id } = req.params;
        const reclamoTipo = await reclamosTipoService.findById(id);
        if (reclamoTipo) {
            res.status(200).json(reclamoTipo);
        } else {
            res.status(404).json({ message: `Reclamo Tipo con id ${id} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createReclamosTipo = async (req, res) => {
    try {
        const { descripcion, activo } = req.body;
        await reclamosTipoService.create({ descripcion, activo });
        res.status(201).json({ message: 'Reclamo Tipo creado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateReclamosTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, activo } = req.body;
        await reclamosTipoService.update(id, { descripcion, activo });
        res.status(200).json({ message: `Reclamo Tipo con id ${id} actualizado correctamente` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteReclamosTipo = async (req, res) => {
    try {
        const { id } = req.params;
        await reclamosTipoService.delete(id);
        res.status(200).json({ message: `Reclamo Tipo con id ${id} eliminado correctamente` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
