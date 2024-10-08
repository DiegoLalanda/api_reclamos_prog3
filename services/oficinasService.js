import connectToDatabase from '../config/db.js';

export default class OficinaService {
    async findAll() {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM oficinas';
        const [rows] = await connection.execute(query);
        return rows;
    }

    async findById(id) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM oficinas WHERE idOficina = ?';
        const [rows] = await connection.execute(query, [id]);
        return rows[0];
    }

    async create(oficina) {
        const connection = await connectToDatabase();
        const query = 'INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?, ?, ?)';
        await connection.execute(query, [oficina.nombre, oficina.idReclamoTipo, oficina.activo]);
    }

    async update(id, oficina) {
        const connection = await connectToDatabase();
        const query = 'UPDATE oficinas SET nombre = ?, idReclamoTipo = ?, activo = ? WHERE idOficina = ?';
        await connection.execute(query, [oficina.nombre, oficina.idReclamoTipo, oficina.activo, id]);
    }

    async delete(id) {
        const connection = await connectToDatabase();
        const query = 'DELETE FROM oficinas WHERE idOficina = ?';
        await connection.execute(query, [id]);
    }
}
