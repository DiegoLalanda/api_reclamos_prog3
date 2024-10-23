import connectToDatabase from '../config/db.js';

export default class ReclamosTipoService {
    async findAll() {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamos_tipo';
        const [rows] = await connection.execute(query);
        return rows;
    }

    async findById(id) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamos_tipo WHERE idReclamoTipo = ?';
        const [rows] = await connection.execute(query, [id]);
        return rows[0];
    }

    async create(reclamoTipo) {
        const connection = await connectToDatabase();
        const query = 'INSERT INTO reclamos_tipo (descripcion, activo) VALUES (?, ?)';
        await connection.execute(query, [reclamoTipo.descripcion, reclamoTipo.activo]);
    }

    async update(id, reclamoTipo) {
        const connection = await connectToDatabase();
        const query = 'UPDATE reclamos_tipo SET descripcion = ?, activo = ? WHERE idReclamoTipo = ?';
        await connection.execute(query, [reclamoTipo.descripcion, reclamoTipo.activo, id]);
    }

    async delete(id) {
        const connection = await connectToDatabase();
        const query = 'DELETE FROM reclamos_tipo WHERE idReclamoTipo = ?';
        await connection.execute(query, [id]);
    }
}
