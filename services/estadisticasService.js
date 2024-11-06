// services/estadisticasService.js
import EstadisticasData from '../database/estadisticasData.js';

export const obtenerTotalReclamosPorTipo = async () => {
    return await EstadisticasData.getTotalReclamosPorTipo();
};

export const obtenerTotalReclamosPorEstado = async () => {
    return await EstadisticasData.getTotalReclamosPorEstado();
};

export const obtenerTiempoPromedioReclamos = async () => {
    return await EstadisticasData.getTiempoPromedioReclamos();
};
