// database/estadisticasData.js
import connectToDatabase from '../config/db.js';

export default class EstadisticasData {
    static async getTotalReclamosPorTipo() {
        const connection = await connectToDatabase();
        const query = 'CALL totalReclamosPorTipo()';
        const [rows] = await connection.execute(query);
        return rows[0]; // Retorna los resultados del primer conjunto de resultados
    }

    static async getTotalReclamosPorEstado() {
        const connection = await connectToDatabase();
        const query = 'CALL totalReclamosPorEstado()';
        const [rows] = await connection.execute(query);
        return rows[0]; // Retorna los resultados del primer conjunto de resultados
    }

    static async getTiempoPromedioReclamos() {
        const connection = await connectToDatabase();
        const query = 'CALL tiempoPromedioEnProceso()';
        const [rows] = await connection.execute(query);
        return rows[0]; // Retorna los resultados del primer conjunto de resultados
    }
}
