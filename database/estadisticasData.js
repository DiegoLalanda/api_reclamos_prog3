// database/estadisticasData.js
import connectToDatabase from '../config/db.js';

export default class EstadisticasData {
    static async getTotalReclamosPorTipo() {
        const connection = await connectToDatabase();
        const query = 'CALL totalReclamosPorTipo()';
        const [rows] = await connection.execute(query);
        return rows[0];
    }

    static async getTotalReclamosPorEstado() {
        const connection = await connectToDatabase();
        const query = 'CALL totalReclamosPorEstado()';
        const [rows] = await connection.execute(query);
        return rows[0];
    }

    static async getTiempoPromedioReclamos() {
        const connection = await connectToDatabase();
        const query = 'CALL tiempoPromedioEnProceso()';
        const [rows] = await connection.execute(query);
        return rows[0];
    }

    static async getDatosPDF() {
        const connection = await connectToDatabase();
        const query = 'CALL datosPDF()';
        const [rows] = await connection.execute(query);
        return rows[0]; // Devuelve el resultado del procedimiento datosPDF
    }
}
