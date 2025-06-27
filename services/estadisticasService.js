import db from '../models/index.js';
import { fn, col, literal } from 'sequelize';

const { Reclamo, ReclamoTipo, ReclamoEstado } = db;

export const obtenerTotalReclamosPorTipo = async () => {
    return await Reclamo.findAll({
        attributes: [
            [col('ReclamoTipo.descripcion'), 'tipo'],
            [fn('COUNT', col('Reclamo.idReclamo')), 'total'],
        ],
        include: [{
            model: ReclamoTipo,
            attributes: [] // No queremos columnas de esta tabla, solo su descripción
        }],
        group: ['ReclamoTipo.idReclamoTipo', 'ReclamoTipo.descripcion'],
    });
};

export const obtenerTotalReclamosPorEstado = async () => {
    return await Reclamo.findAll({
        attributes: [
            [col('ReclamoEstado.descripcion'), 'estado'],
            [fn('COUNT', col('Reclamo.idReclamo')), 'total'],
        ],
        include: [{
            model: ReclamoEstado,
            attributes: []
        }],
        group: ['ReclamoEstado.idReclamoEstado', 'ReclamoEstado.descripcion'],
    });
};

export const obtenerTiempoPromedioReclamos = async () => {
    // Esta consulta es más compleja y usa SQL nativo para mayor precisión
    const [results] = await db.sequelize.query(`
        SELECT AVG(EXTRACT(EPOCH FROM ("fechaFinalizado" - "fechaCreado")) / 3600) as "tiempoPromedioHoras"
        FROM reclamos
        WHERE "fechaFinalizado" IS NOT NULL;
    `);
    return results[0] || { tiempoPromedioHoras: 0 };
};