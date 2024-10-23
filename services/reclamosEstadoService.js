import connectToDatabase from '../config/db.js';

export default class ReclamosEstadoService {
    async findAll() {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamos_estado';
        const [rows] = await connection.execute(query);
        return rows;
    }

    async findById(id) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamos_estado WHERE idReclamoEstado = ?';
        const [rows] = await connection.execute(query, [id]);
        return rows[0];
    }

    async create(reclamoEstado) {
        const connection = await connectToDatabase();
        const query = 'INSERT INTO reclamos_estado (descripcion) VALUES (?)';
        await connection.execute(query, [reclamoEstado.descripcion]);
    }

    async update(id, reclamoEstado) {
        const connection = await connectToDatabase();
        const query = 'UPDATE reclamos_estado SET descripcion = ? WHERE idReclamoEstado = ?';
        await connection.execute(query, [reclamoEstado.descripcion, id]);
    }

    async delete(id) {
        const connection = await connectToDatabase();
        const query = 'DELETE FROM reclamos_estado WHERE idReclamoEstado = ?';
        await connection.execute(query, [id]);
    }
}
