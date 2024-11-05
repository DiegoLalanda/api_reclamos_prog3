import connectToDatabase from '../config/db.js';

export default class ReclamosData {
    static async findById(idReclamo) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamos WHERE idReclamo = ?';
        const [rows] = await connection.execute(query, [idReclamo]);
        return rows[0];
    }

    static async findAll() {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamos';
        const [rows] = await connection.execute(query);
        return rows;
    }

    static async create(asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) {
        const connection = await connectToDatabase();
        const query = 'INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) VALUES (?, ?, ?, ?, ?, ?)';
        await connection.execute(query, [asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador]);
    }

    static async update(idReclamo, asunto, descripcion) {
        const connection = await connectToDatabase();
        const query = 'UPDATE reclamos SET asunto = ?, descripcion = ? WHERE idReclamo = ?';
        await connection.execute(query, [asunto, descripcion, idReclamo]);
    }

    static async updateEstado(idReclamo, nuevoEstado) {
        const connection = await connectToDatabase();
        const query = 'UPDATE reclamos SET idReclamoEstado = ? WHERE idReclamo = ?';
        await connection.execute(query, [nuevoEstado, idReclamo]);
    }

    static async cancelarReclamo(idReclamo, idUsuarioCancelador) {
        const connection = await connectToDatabase();
        const query = `
            UPDATE reclamos 
            SET idReclamoEstado = 3, fechaCancelado = NOW(), idUsuarioFinalizador = ? 
            WHERE idReclamo = ?
        `;
        await connection.execute(query, [idUsuarioCancelador, idReclamo]);
    }
    
    static async finalizarReclamo(idReclamo, idUsuarioFinalizador) {
        const connection = await connectToDatabase();
        const query = 'UPDATE reclamos SET idReclamoEstado = (SELECT idReclamosEstado FROM reclamos_estado WHERE descripcion = "Finalizado"), fechaFinalizado = NOW(), idUsuarioFinalizador = ? WHERE idReclamo = ?';
        await connection.execute(query, [idUsuarioFinalizador, idReclamo]);
    }

    static async findByEstado(idReclamoEstado) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM reclamos WHERE idReclamoEstado = ?';
        const [rows] = await connection.execute(query, [idReclamoEstado]);
        return rows;
    }

    static async findUsuarioById(idUsuario) {
        const connection = await connectToDatabase();
        const query = 'SELECT * FROM usuarios WHERE idUsuario = ?';
        const [rows] = await connection.execute(query, [idUsuario]);
        return rows[0];
    }

    static async getEstadoDescripcion(idReclamoEstado) {
        const connection = await connectToDatabase();
        const query = 'SELECT descripcion FROM reclamos_estado WHERE idReclamosEstado = ?';
        const [rows] = await connection.execute(query, [idReclamoEstado]);
        return rows.length > 0 ? rows[0].descripcion : null;
    }

    static async getTipoDescripcion(idReclamoTipo) {
        const connection = await connectToDatabase();
        const query = 'SELECT descripcion FROM reclamos_tipo WHERE idReclamosTipo = ?';
        const [rows] = await connection.execute(query, [idReclamoTipo]);
        return rows.length > 0 ? rows[0].descripcion : null;
    }

    // Obtener la oficina de un empleado desde la tabla usuarios_oficinas
    static async getOficinaByEmpleado(idEmpleado) {
        const connection = await connectToDatabase();
        const query = 'SELECT idOficina FROM usuarios_oficinas WHERE idUsuario = ?';
        const [result] = await connection.execute(query, [idEmpleado]);
        
        if (result.length === 0) {
            return null; // No se encontró la oficina asociada al empleado
        }

        return result[0].idOficina; // Devolvemos el idOficina
    }

    // Método para obtener los reclamos por oficina
    static async findByOficina(idOficina) {
        const connection = await connectToDatabase();
        const tipoQuery = 'SELECT idReclamoTipo FROM oficinas WHERE idOficina = ?';
        const [tipoResult] = await connection.execute(tipoQuery, [idOficina]);

        if (tipoResult.length === 0) {
            throw new Error('No se encontró la oficina');
        }

        const idReclamoTipo = tipoResult[0].idReclamoTipo;
        const query = 'SELECT * FROM reclamos WHERE idReclamoTipo = ?';
        const [reclamos] = await connection.execute(query, [idReclamoTipo]);

        return reclamos;
    }
}
