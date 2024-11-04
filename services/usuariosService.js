import connectToDatabase from '../config/db.js'; 

export default class UsuariosServices {
    async findAll(filters, limit = 0, offset = 0, order = 'idUsuario', asc = true) {
        const { nombre, apellido } = filters;
    
        const connection = await connectToDatabase();
        let query = `SELECT * FROM usuarios WHERE idTipoUsuario = ? AND activo = 1`; 
        const whereClauses = [];
        const params = [1]; 
    
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

    async findById(id) {
        const connection = await connectToDatabase();
        const query = `SELECT * FROM usuarios WHERE idUsuario = ? AND idTipoUsuario = ? AND activo = 1`; 
        const [results] = await connection.execute(query, [id, 1]);
        return results.length > 0 ? results[0] : null;
    }   

    async findByEmail(correoElectronico) {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(
            `SELECT * FROM usuarios WHERE correoElectronico = ?`,
            [correoElectronico]
        );
        return rows[0];
    }

    async create(user) {
        const { nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen } = user;
        const connection = await connectToDatabase();
        const [result] = await connection.execute(
            `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen]
        );
        return { idUsuario: result.insertId, ...user }; 
    }

    async update(id, user) {
        const { nombre, apellido, correoElectronico, idTipoUsuario, imagen } = user;
    
        const connection = await connectToDatabase();
    
        if (!id || isNaN(id)) {
            throw new Error("ID inválido.");
        }
    
        if (!nombre && !apellido && !correoElectronico && !idTipoUsuario && !imagen) {
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
        if (idTipoUsuario !== undefined) {
            fieldsToUpdate.push('idTipoUsuario = ?');
            params.push(idTipoUsuario);
        }
        if (imagen !== undefined) {
            fieldsToUpdate.push('imagen = ?');
            params.push(imagen);
        }
    
        params.push(id);
    
        const query = `UPDATE usuarios SET ${fieldsToUpdate.join(', ')} WHERE idUsuario = ?`;
    
    
        const [result] = await connection.execute(query, params);
    
        if (result.affectedRows === 0) {
            throw new Error("No se actualizó ningún usuario. Verifica que el ID exista.");
        }
    
        return this.findById(id); 
    }
    
    async destroy(id) {
        const connection = await connectToDatabase();    
        await connection.execute(`UPDATE usuarios SET activo = 0 WHERE idUsuario = ? AND idTipoUsuario = ?`, [id, 1]);
    }
}
