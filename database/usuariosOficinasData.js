// database/usuariosOficinasData.js
import connectToDatabase from '../config/db.js';

export default class UsuariosOficinasData {
    // Obtener todas las relaciones de usuarios y oficinas
    static async findAll() {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM usuarios_oficinas';
        const [rows] = await connection.execute(query);
        return rows;
    }

    // Obtener una relación usuario-oficina por ID
    static async findById(id) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM usuarios_oficinas WHERE idUsuarioOficina = ?  AND activo = 1';
        const [rows] = await connection.execute(query, [id]);
        return rows[0];
    }

    // Crear una nueva relación usuario-oficina
    static async create(idUsuario, idOficina, activo) {
        const connection = await connectToDatabase();
        const query = 'INSERT INTO usuarios_oficinas (idUsuario, idOficina, activo) VALUES (?, ?, ?)';
        await connection.execute(query, [idUsuario, idOficina, activo]);
    }

    // Actualizar una relación usuario-oficina
    static async update(id, idUsuario, idOficina, activo) {
        const connection = await connectToDatabase();
        const query = 'UPDATE usuarios_oficinas SET idUsuario = ?, idOficina = ?, activo = ? WHERE idUsuarioOficina = ?';
        await connection.execute(query, [idUsuario, idOficina, activo, id]);
    }

    // Eliminar una relación usuario-oficina
    static async delete(id) {
        const connection = await connectToDatabase();
        const query = 'DELETE FROM usuarios_oficinas WHERE idUsuarioOficina = ?';
        await connection.execute(query, [id]);
    }
}
