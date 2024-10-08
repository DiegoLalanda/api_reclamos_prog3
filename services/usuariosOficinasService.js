import connectToDatabase from '../config/db.js';

export default class UsuariosOficinasService {
    async findAll() {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM usuariosOficinas';
        const [rows] = await connection.execute(query);
        return rows;
    }

    async findById(id) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM usuariosOficinas WHERE idUsuarioOficina = ?';
        const [rows] = await connection.execute(query, [id]);
        return rows[0];
    }

    async create(usuariosOficinas) {
        const connection = await connectToDatabase();
        const query = 'INSERT INTO usuariosOficinas (idUsuario, idOficina, activo) VALUES (?, ?, ?)';
        await connection.execute(query, [usuariosOficinas.idUsuario, usuariosOficinas.idOficina, usuariosOficinas.activo]);
    }

    async update(id, usuariosOficinas) {
        const connection = await connectToDatabase();
        const query = 'UPDATE usuariosOficinas SET idUsuario = ?, idOficina = ?, activo = ? WHERE idUsuarioOficina = ?';
        await connection.execute(query, [usuariosOficinas.idUsuario, usuariosOficinas.idOficina, usuariosOficinas.activo, id]);
    }

    async delete(id) {
        const connection = await connectToDatabase();
        const query = 'DELETE FROM usuariosOficinas WHERE idUsuarioOficina = ?';
        await connection.execute(query, [id]);
    }
}
