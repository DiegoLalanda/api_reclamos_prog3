import connectToDatabase from '../config/db.js'; // Importa la función de conexión

export default class ReclamoService {
    async findById(idReclamo) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamos WHERE idReclamo = ?';
        const [rows] = await connection.execute(query, [idReclamo]);
        return rows[0]; // Retorna el primer resultado
    }

    async updateEstado(idReclamo, nuevoEstado) {
        const connection = await connectToDatabase();
        const query = 'UPDATE reclamos SET idReclamoEstado = ? WHERE idReclamo = ?';
        await connection.execute(query, [nuevoEstado, idReclamo]);
    }

    async findUsuarioById(idUsuario) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM usuarios WHERE idUsuario = ?';
        const [rows] = await connection.execute(query, [idUsuario]);
        return rows[0]; // Retorna el primer resultado
    }

    // Obtener la descripción del estado a partir del ID
    async getEstadoDescripcion(idReclamoEstado) {
        const connection = await connectToDatabase(); // Establecer conexión a la base de datos
        const query = `SELECT descripcion FROM reclamosEstado WHERE idReclamoEstado = ?`;
        const [rows] = await connection.execute(query, [idReclamoEstado]);
        return rows.length > 0 ? rows[0].descripcion : null;
    }

    // Obtener la descripción del tipo de reclamo a partir del ID
    async getTipoDescripcion(idReclamoTipo) {
        const connection = await connectToDatabase(); // Establecer conexión a la base de datos
        const query = `SELECT descripcion FROM reclamosTipo WHERE idReclamoTipo = ?`;
        const [rows] = await connection.execute(query, [idReclamoTipo]);
        return rows.length > 0 ? rows[0].descripcion : null;
    }
}
