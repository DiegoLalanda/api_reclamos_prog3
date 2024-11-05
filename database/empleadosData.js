import connectToDatabase from '../config/db.js';

export default class EmpleadosData {
    static async findAll(filters, limit = 0, offset = 0, order = 'idUsuario', asc = true) {
        const { nombre, apellido } = filters;

        const connection = await connectToDatabase();
        let query = `SELECT * FROM usuarios WHERE idTipoUsuario = ?`;
        const whereClauses = [];
        const params = [2]; 

        if (nombre) {
            whereClauses.push(`nombre LIKE ?`);
            params.push(`%${nombre}%`);
        }
        if (apellido) {
            whereClauses.push(`apellido LIKE ?`);
            params.push(`%${apellido}%`);
        }

        if (whereClauses.length > 0) {
            query += ` AND ${whereClauses.join(' AND ')}`;
        }

        query += ` ORDER BY ${order} ${asc ? 'ASC' : 'DESC'}`;
        if (limit > 0) {
            query += ` LIMIT ? OFFSET ?`;
            params.push(limit, offset);
        }

        const [results] = await connection.execute(query, params);
        return results;
    }

    static async findById(id) {
        const connection = await connectToDatabase();
        const query = `SELECT * FROM usuarios WHERE idUsuario = ? AND idTipoUsuario = ?`;
        const [results] = await connection.execute(query, [id, 2]);
        return results.length > 0 ? results[0] : null;
    }

    static async findByEmail(correoElectronico) {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(
            `SELECT * FROM usuarios WHERE correoElectronico = ? AND idTipoUsuario = ?`,
            [correoElectronico, 2]
        );
        return rows[0];
    }

    static async create(empleado) {
        const { nombre, apellido, correoElectronico, contrasenia, imagen } = empleado;
        const connection = await connectToDatabase();
        const [result] = await connection.execute(
            `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, apellido, correoElectronico, contrasenia, 2, imagen] 
        );
        return { idUsuario: result.insertId, ...empleado };
    }

    static async update(id, empleado) {
        const { nombre, apellido, correoElectronico, imagen } = empleado;

        const connection = await connectToDatabase();

        if (!id || isNaN(id)) {
            throw new Error("ID inválido.");
        }

        if (!nombre && !apellido && !correoElectronico && !imagen) {
            throw new Error("No se proporcionaron campos para actualizar.");
        }

        const fieldsToUpdate = [];
        const params = [];

        if (nombre !== undefined) {
            fieldsToUpdate.push('nombre = ?');
            params.push(nombre);
        }
        if (apellido !== undefined) {
            fieldsToUpdate.push('apellido = ?');
            params.push(apellido);
        }
        if (correoElectronico !== undefined) {
            fieldsToUpdate.push('correoElectronico = ?');
            params.push(correoElectronico);
        }
        if (imagen !== undefined) {
            fieldsToUpdate.push('imagen = ?');
            params.push(imagen);
        }

        params.push(id);

        const query = `UPDATE usuarios SET ${fieldsToUpdate.join(', ')} WHERE idUsuario = ? AND idTipoUsuario = ?`;
        
        const [result] = await connection.execute(query, [...params, 2]); 

        if (result.affectedRows === 0) {
            throw new Error("No se actualizó ningún empleado. Verifica que el ID exista y sea un empleado.");
        }

        return this.findById(id);
    }

    static async destroy(id) {
        const connection = await connectToDatabase();
        await connection.execute(`DELETE FROM usuarios WHERE idUsuario = ? AND idTipoUsuario = ?`, [id, 2]);
    }
}