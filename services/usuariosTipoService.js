import connectToDatabase from '../config/db.js';

export default class UsuariosTipoService {
    // Obtener todos los tipos de usuario
    async findAll() {
        const connection = await connectToDatabase();
        const [results] = await connection.execute('SELECT * FROM usuarios_tipo');
        return results;
    }

    // Obtener un tipo de usuario por ID
    async findById(id) {
        const connection = await connectToDatabase();
        // Cambiado de idReclamoTipo a idUsuarioTipo
        const [results] = await connection.execute('SELECT * FROM usuarios_tipo WHERE idUsuarioTipo = ?', [id]);
        return results[0]; // Retornar el primer resultado si se encuentra
    }

    // Crear un nuevo tipo de usuario
    async create(usuarioTipo) {
        const { descripcion, activo } = usuarioTipo;
        const connection = await connectToDatabase();
        // Cambiado de idReclamoTipo a idUsuarioTipo en el retorno del ID creado
        const [result] = await connection.execute(
            'INSERT INTO usuarios_tipo (descripcion, activo) VALUES (?, ?)',
            [descripcion, activo]
        );
        return { idUsuarioTipo: result.insertId, descripcion, activo };
    }

    // Actualizar un tipo de usuario
    async update(id, usuarioTipo) {
        const { descripcion, activo } = usuarioTipo;
        const connection = await connectToDatabase();
        // Cambiado de idReclamoTipo a idUsuarioTipo
        await connection.execute(
            'UPDATE usuarios_tipo SET descripcion = ?, activo = ? WHERE idUsuarioTipo = ?',
            [descripcion, activo, id]
        );
        return this.findById(id); // Retornar el tipo de usuario actualizado
    }

    // Eliminar un tipo de usuario
    async destroy(id) {
        const connection = await connectToDatabase();
        // Cambiado de idReclamoTipo a idUsuarioTipo
        await connection.execute('DELETE FROM usuarios_tipo WHERE idUsuarioTipo = ?', [id]);
    }
}
