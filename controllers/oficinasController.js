import OficinaService from '../services/oficinasService.js';

const oficinaService = new OficinaService();

export const getAllOficinas = async (req, res) => {
    try {
        const oficinas = await oficinaService.findAll();
        res.status(200).json(oficinas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOficinaById = async (req, res) => {
    try {
        const { id } = req.params;
        const oficina = await oficinaService.findById(id);
        if (oficina) {
            res.status(200).json(oficina);
        } else {
            res.status(404).json({ message: `Oficina con id ${id} no encontrada` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createOficina = async (req, res) => {
    try {
        const { nombre, idReclamoTipo, activo } = req.body;
        await oficinaService.create({ nombre, idReclamoTipo, activo });
        res.status(201).json({ message: 'Oficina creada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOficina = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, idReclamoTipo, activo } = req.body;
        await oficinaService.update(id, { nombre, idReclamoTipo, activo });
        res.status(200).json({ message: `Oficina con id ${id} actualizada correctamente` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};