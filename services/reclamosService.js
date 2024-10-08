import connectToDatabase from '../config/db.js';

export default class ReclamoService {
    async findById(idReclamo) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamos WHERE idReclamo = ?';
        const [rows] = await connection.execute(query, [idReclamo]);
        return rows[0];
    }

    async findAll() {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamos';
        const [rows] = await connection.execute(query);
        return rows;
    }

    async create(asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) {
        const connection = await connectToDatabase();
        const query = 'INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) VALUES (?, ?, ?, ?, ?, ?)';
        await connection.execute(query, [asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador]);
    }

    async update(idReclamo, asunto, descripcion) {
        const connection = await connectToDatabase();
        const query = 'UPDATE reclamos SET asunto = ?, descripcion = ? WHERE idReclamo = ?';
        await connection.execute(query, [asunto, descripcion, idReclamo]);
    }

    async destroy(idReclamo) {
        const connection = await connectToDatabase();
        const query = 'DELETE FROM reclamos WHERE idReclamo = ?';
        await connection.execute(query, [idReclamo]);
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
        return rows[0];
    }

    async getEstadoDescripcion(idReclamoEstado) {
        const connection = await connectToDatabase();
        const query = `SELECT descripcion FROM reclamosEstado WHERE idReclamoEstado = ?`;
        const [rows] = await connection.execute(query, [idReclamoEstado]);
        return rows.length > 0 ? rows[0].descripcion : null;
    }

    async getTipoDescripcion(idReclamoTipo) {
        const connection = await connectToDatabase();
        const query = `SELECT descripcion FROM reclamosTipo WHERE idReclamoTipo = ?`;
        const [rows] = await connection.execute(query, [idReclamoTipo]);
        return rows.length > 0 ? rows[0].descripcion : null;
    }
}
