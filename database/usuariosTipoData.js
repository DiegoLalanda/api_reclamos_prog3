// database/usuariosTipoData.js
import connectToDatabase from '../config/db.js';

export default class UsuariosTipoData {
    // Obtener todos los tipos de usuario
    static async findAll() {
        const connection = await connectToDatabase();
        const [results] = await connection.execute('SELECT * FROM usuarios_tipo');
        return results;
    }

    // Obtener un tipo de usuario por ID
    static async findById(id) {
        const connection = await connectToDatabase();
        const [results] = await connection.execute('SELECT * FROM usuarios_tipo WHERE idUsuarioTipo = ?', [id]);
        return results[0];
    }

    // Crear un nuevo tipo de usuario
    static async create(descripcion, activo) {
        const connection = await connectToDatabase();
        const [result] = await connection.execute(
            'INSERT INTO usuarios_tipo (descripcion, activo) VALUES (?, ?)',
            [descripcion, activo]
        );
        return { idUsuarioTipo: result.insertId, descripcion, activo };
    }

    // Actualizar un tipo de usuario
    static async update(id, descripcion, activo) {
        const connection = await connectToDatabase();
        await connection.execute(
            'UPDATE usuarios_tipo SET descripcion = ?, activo = ? WHERE idUsuarioTipo = ?',
            [descripcion, activo, id]
        );
    }

    // Eliminar un tipo de usuario
    static async destroy(id) {
        const connection = await connectToDatabase();
        await connection.execute('DELETE FROM usuarios_tipo WHERE idUsuarioTipo = ?', [id]);
    }
}
