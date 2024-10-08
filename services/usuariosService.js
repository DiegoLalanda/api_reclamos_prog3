import connectToDatabase from '../config/db.js'; // Importa la función de conexión

export default class UsuariosServices {
    async findAll(filters, limit = 0, offset = 0, order = 'idUsuario', asc = true) {
        const { nombre, apellido } = filters;

        // Establecer conexión a la base de datos
        const connection = await connectToDatabase();
        let query = `SELECT * FROM usuarios`;
        const whereClauses = [];
        const params = [];

        // Añadir filtros
        if (nombre) {
            whereClauses.push(`nombre LIKE ?`);
            params.push(`%${nombre}%`);
        }
        if (apellido) {
            whereClauses.push(`apellido LIKE ?`);
            params.push(`%${apellido}%`);
        }

        if (whereClauses.length > 0) {
            query += ` WHERE ${whereClauses.join(' AND ')}`;
        }

        query += ` ORDER BY ${order} ${asc ? 'ASC' : 'DESC'}`;
        if (limit > 0) {
            query += ` LIMIT ? OFFSET ?`;
            params.push(limit, offset);
        }

        const [results] = await connection.execute(query, params); // Usar execute para consultas
        return results;
    }

    async findById(id) {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM usuarios WHERE idUsuario = ?`, [id]);
        return rows[0]; // Retorna el primer usuario encontrado
    }

    async create(user) {
        const { nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen } = user;
        const connection = await connectToDatabase();
        const [result] = await connection.execute(
            `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen]
        );
        return { idUsuario: result.insertId, ...user }; // Devuelve el nuevo usuario con su ID
    }

    async update(id, user) {
        const { nombre, apellido, correoElectronico, idTipoUsuario, imagen } = user;
        const connection = await connectToDatabase();
        await connection.execute(
            `UPDATE usuarios SET nombre = ?, apellido = ?, correoElectronico = ?, idTipoUsuario = ?, imagen = ?
            WHERE idUsuario = ?`,
            [nombre, apellido, correoElectronico, idTipoUsuario, imagen, id]
        );

        return this.findById(id); // Devuelve el usuario actualizado
    }

    async destroy(id) {
        const connection = await connectToDatabase();
        await connection.execute(`DELETE FROM usuarios WHERE idUsuario = ?`, [id]);
    }
}
