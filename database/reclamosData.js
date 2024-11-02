
import connectToDatabase from '../config/db.js';

export default class ReclamosData {
    static async findById(idReclamo) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamos WHERE idReclamo = ?';
        const [rows] = await connection.execute(query, [idReclamo]);
        return rows[0];
    }

    static async findAll() {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamos';
        const [rows] = await connection.execute(query);
        return rows;
    }

    static async create(asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) {
        const connection = await connectToDatabase();
        const query = 'INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) VALUES (?, ?, ?, ?, ?, ?)';
        await connection.execute(query, [asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador]);
    }

    static async update(idReclamo, asunto, descripcion) {
        const connection = await connectToDatabase();
        const query = 'UPDATE reclamos SET asunto = ?, descripcion = ? WHERE idReclamo = ?';
        await connection.execute(query, [asunto, descripcion, idReclamo]);
    }

    static async updateEstado(idReclamo, nuevoEstado) {
        const connection = await connectToDatabase();
        const query = 'UPDATE reclamos SET idReclamoEstado = ? WHERE idReclamo = ?';
        await connection.execute(query, [nuevoEstado, idReclamo]);
    }

    static async findUsuarioById(idUsuario) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM usuarios WHERE idUsuario = ?';
        const [rows] = await connection.execute(query, [idUsuario]);
        return rows[0];
    }

    static async getEstadoDescripcion(idReclamoEstado) {
        const connection = await connectToDatabase();
        const query = 'SELECT descripcion FROM reclamos_estado WHERE idReclamosEstado = ?';
        const [rows] = await connection.execute(query, [idReclamoEstado]);
        return rows.length > 0 ? rows[0].descripcion : null;
    }

    static async getTipoDescripcion(idReclamoTipo) {
        const connection = await connectToDatabase();
        const query = 'SELECT descripcion FROM reclamos_tipo WHERE idReclamosTipo = ?';
        const [rows] = await connection.execute(query, [idReclamoTipo]);
        return rows.length > 0 ? rows[0].descripcion : null;
    }
}