// database/reclamosTipoData.js
import connectToDatabase from '../config/db.js';

export default class ReclamosTipoData {
    static async findAll() {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamos_tipo';
        const [rows] = await connection.execute(query);
        return rows;
    }

    static async findById(id) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamos_tipo WHERE idReclamoTipo = ?';
        const [rows] = await connection.execute(query, [id]);
        return rows[0];
    }

    static async create(reclamoTipo) {
        const connection = await connectToDatabase();
        const query = 'INSERT INTO reclamos_tipo (descripcion, activo) VALUES (?, ?)';
        await connection.execute(query, [reclamoTipo.descripcion, reclamoTipo.activo]);
    }

    static async update(id, reclamoTipo) {
        const connection = await connectToDatabase();
        const query = 'UPDATE reclamos_tipo SET descripcion = ?, activo = ? WHERE idReclamoTipo = ?';
        await connection.execute(query, [reclamoTipo.descripcion, reclamoTipo.activo, id]);
    }

    static async updateStatus(id, activo) {
        const connection = await connectToDatabase();
        const query = 'UPDATE reclamos_tipo SET activo = ? WHERE idReclamoTipo = ?';
        await connection.execute(query, [activo, id]);
    }
}
