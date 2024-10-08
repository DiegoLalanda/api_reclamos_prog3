import connectToDatabase from '../config/db.js';

export default class ReclamosTipoService {
    async findAll() {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamosTipo';
        const [rows] = await connection.execute(query);
        return rows;
    }

    async findById(id) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamosTipo WHERE idReclamoTipo = ?';
        const [rows] = await connection.execute(query, [id]);
        return rows[0];
    }

    async create(reclamoTipo) {
        const connection = await connectToDatabase();
        const query = 'INSERT INTO reclamosTipo (descripcion, activo) VALUES (?, ?)';
        await connection.execute(query, [reclamoTipo.descripcion, reclamoTipo.activo]);
    }

    async update(id, reclamoTipo) {
        const connection = await connectToDatabase();
        const query = 'UPDATE reclamosTipo SET descripcion = ?, activo = ? WHERE idReclamoTipo = ?';
        await connection.execute(query, [reclamoTipo.descripcion, reclamoTipo.activo, id]);
    }

    async delete(id) {
        const connection = await connectToDatabase();
        const query = 'DELETE FROM reclamosTipo WHERE idReclamoTipo = ?';
        await connection.execute(query, [id]);
    }
}
