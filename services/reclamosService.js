import db from '../models/index.js';
const { Reclamo, Usuario, Oficina, ReclamoTipo, ReclamoEstado } = db;

export default class ReclamoService {
    async findById(idReclamo) {
        return await Reclamo.findByPk(idReclamo, {
            include: [
                { model: Usuario, as: 'creador' },
                { model: ReclamoTipo },
                { model: ReclamoEstado }
            ]
        });
    }

    async findByIdAndCreador(idReclamo, idCreador) {
        return await Reclamo.findOne({
            where: {
                idReclamo,
                idUsuarioCreador: idCreador,
            }
        });
    }
    
    async findAll() {
        return await Reclamo.findAll({
            include: [
                { model: Usuario, as: 'creador', attributes: ['nombre', 'apellido'] },
                { model: ReclamoTipo, attributes: ['descripcion'] },
                { model: ReclamoEstado, attributes: ['descripcion'] }
            ]
        });
    }

    async create(asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) {
        return await Reclamo.create({
            asunto,
            descripcion,
            fechaCreado,
            idReclamoEstado,
            idReclamoTipo,
            idUsuarioCreador,
        });
    }

    async update(idReclamo, asunto, descripcion) {
        return await Reclamo.update({ asunto, descripcion }, { where: { idReclamo } });
    }

    async updateEstado(idReclamo, nuevoEstado) {
        const updateData = { idReclamoEstado: nuevoEstado };
        if (parseInt(nuevoEstado, 10) === 4) {
            updateData.fechaFinalizado = new Date();
        }
        return await Reclamo.update(updateData, { where: { idReclamo } });
    }    

    async cancelarReclamo(idReclamo, idUsuarioCancelador) {
        return await Reclamo.update({
            idReclamoEstado: 3,
            fechaCancelado: new Date(),
            idUsuarioFinalizador: idUsuarioCancelador,
        }, { where: { idReclamo } });
    }

    async findUsuarioById(idUsuario) {
        return await Usuario.findByPk(idUsuario);
    }

    async getOficinaByEmpleado(idEmpleado) {
        const usuario = await Usuario.findByPk(idEmpleado, {
            include: { model: Oficina } // Incluimos las oficinas asociadas
        });
        // Devolvemos la primera oficina encontrada, si existe
        return usuario?.Oficinas?.[0];
    }

    async findByOficina(idOficina) {
        const oficina = await Oficina.findByPk(idOficina);
        if (!oficina) throw new Error('Oficina no encontrada');

        return await Reclamo.findAll({
            where: { idReclamoTipo: oficina.idReclamoTipo }
        });
    } 
}