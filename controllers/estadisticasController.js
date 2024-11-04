// estadisticasController.js
import {
    obtenerTotalReclamosPorTipo,
    obtenerTotalReclamosPorEstado,
    obtenerTiempoPromedioReclamos
} from '../services/estadisticasService.js';

export const getEstadisticasReclamosPorTipo = async (req, res, next) => {
    try {
        const resultado = await obtenerTotalReclamosPorTipo();
        res.status(200).json({ success: true, data: resultado });
    } catch (error) {
        next(error);
    }
};

export const getEstadisticasReclamosPorEstado = async (req, res, next) => {
    try {
        const resultado = await obtenerTotalReclamosPorEstado();
        res.status(200).json({ success: true, data: resultado });
    } catch (error) {
        next(error);
    }
};

export const getEstadisticasTiempoPromedioReclamos = async (req, res, next) => {
    try {
        const resultado = await obtenerTiempoPromedioReclamos();
        res.status(200).json({ success: true, data: resultado });
    } catch (error) {
        next(error);
    }
};
