import connectToDatabase from '../config/db.js'; // Importa la función de conexión

export default class ReclamoService {
    async findById(idReclamo) {
        // Establecer conexión a la base de datos
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamos WHERE idReclamo = ?';
        const [rows] = await connection.execute(query, [idReclamo]);
        return rows[0]; // Retorna el primer resultado
    }

    async updateEstado(idReclamo, nuevoEstado) {
        // Establecer conexión a la base de datos
        const connection = await connectToDatabase();
        const query = 'UPDATE reclamos SET idReclamoEstado = ? WHERE idReclamo = ?';
        await connection.execute(query, [nuevoEstado, idReclamo]);
    }

    async findUsuarioById(idUsuario) {
        // Establecer conexión a la base de datos
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM usuarios WHERE idUsuario = ?';
        const [rows] = await connection.execute(query, [idUsuario]);
        return rows[0]; // Retorna el primer resultado
    }
}
