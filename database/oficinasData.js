// database/oficinasData.js
import connectToDatabase from '../config/db.js';

export default class OficinasData {
    static async findAll() {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM oficinas';
        const [rows] = await connection.execute(query);
        return rows;
    }

    static async findById(id) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM oficinas WHERE idOficina = ?';
        const [rows] = await connection.execute(query, [id]);
        return rows[0];
    }

    static async create(oficina) {
        const connection = await connectToDatabase();
        const query = 'INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?, ?, ?)';
        await connection.execute(query, [oficina.nombre, oficina.idReclamoTipo, oficina.activo]);
    }

    static async update(id, oficina) {
        const connection = await connectToDatabase();
        const query = 'UPDATE oficinas SET nombre = ?, idReclamoTipo = ?, activo = ? WHERE idOficina = ?';
        await connection.execute(query, [oficina.nombre, oficina.idReclamoTipo, oficina.activo, id]);
    }
}
