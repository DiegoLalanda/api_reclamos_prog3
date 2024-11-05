import ReclamoService from '../services/reclamosService.js';
import EmailService from '../services/emailService.js';
import PDFUtils from '../utils/PDFutils.js';

export default class ReclamosController {
    constructor() {
        this.reclamoService = new ReclamoService();
        this.emailService = new EmailService();
    }

    findAllReclamos = async (req, res) => {
        try {
            const reclamos = await this.reclamoService.findAll();
            res.status(200).json(reclamos);
        } catch (error) {
            console.error('Error al obtener todos los reclamos:', error);
            res.status(500).json({ message: 'Error al obtener todos los reclamos', error: error.message });
        }
    };

    findByIdReclamo = async (req, res) => {
        const { idReclamo } = req.params;
        try {
            const reclamo = await this.reclamoService.findById(idReclamo);
            if (!reclamo) {
                return res.status(404).json({ message: 'Reclamo no encontrado' });
            }
            res.status(200).json(reclamo);
        } catch (error) {
            console.error('Error al obtener el reclamo:', error);
            res.status(500).json({ message: 'Error al obtener el reclamo', error: error.message });
        }
    };

    createReclamo = async (req, res) => {
        const { asunto, descripcion, idReclamoTipo } = req.body;
        const fechaCreado = new Date();
        const idUsuarioCreador = req.user?.idUsuario;
        
        console.log("Datos recibidos en req.body:", req.body);
        console.log("Fecha de creación generada automáticamente:", fechaCreado);
        console.log("ID del usuario creador (desde req.user.idUsuario):", idUsuarioCreador);
        
        if (!asunto || !idReclamoTipo || !idUsuarioCreador) {
            return res.status(400).json({ message: 'Datos faltantes o incorrectos para crear el reclamo' });
        }
    
        try {
            await this.reclamoService.create(asunto, descripcion, fechaCreado, 1, idReclamoTipo, idUsuarioCreador);
            res.status(201).json({ message: 'Reclamo creado exitosamente' });
        } catch (error) {
            console.error('Error al crear el reclamo:', error);
            res.status(500).json({ message: 'Error al crear el reclamo', error: error.message });
        }
    };
    
    
    updateReclamo = async (req, res) => {
        const { idReclamo } = req.params;
        const { asunto, descripcion } = req.body;
        try {
            await this.reclamoService.update(idReclamo, asunto, descripcion);
            res.status(200).json({ message: 'Reclamo actualizado exitosamente' });
        } catch (error) {
            console.error('Error al actualizar el reclamo:', error);
            res.status(500).json({ message: 'Error al actualizar el reclamo', error: error.message });
        }
    };

    actualizarEstadoReclamo = async (req, res) => {
        const { idReclamo } = req.params;
        const { nuevoEstado } = req.body;

        try {
            const reclamo = await this.reclamoService.findById(idReclamo);
            if (!reclamo) return res.status(404).json({ message: 'Reclamo no encontrado' });

            await this.reclamoService.updateEstado(idReclamo, nuevoEstado);
            const usuario = await this.reclamoService.findUsuarioById(reclamo.idUsuarioCreador);
            if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

            const estadoDescripcion = await this.reclamoService.getEstadoDescripcion(nuevoEstado);
            const tipoDescripcion = await this.reclamoService.getTipoDescripcion(reclamo.idReclamoTipo);

            const emailContext = {
                nombre: usuario.nombre,
                asunto: reclamo.asunto,
                estadoDescripcion: `El estado del reclamo se ha actualizado a: ${estadoDescripcion}`,
                tipoDescripcion: tipoDescripcion || "Tipo no especificado",
                reclamoDescripcion: reclamo.descripcion,
            };

            const templatePath = '../utils/statusChange.hbs';
            await this.emailService.sendEmail(
                usuario.correoElectronico,
                'Estado del reclamo actualizado',
                templatePath,
                emailContext
            );

            res.status(200).json({ message: 'Estado del reclamo actualizado y correo enviado' });
        } catch (error) {
            console.error('Error al actualizar el estado del reclamo:', error);
            res.status(500).json({ message: 'Error al actualizar el estado del reclamo', error: error.message });
        }
    };
    descargarInformeReclamos = async (req, res) => {
        try {
            const reclamos = await this.reclamoService.findAll();

            // Agregar detalles adicionales si son necesarios
            const reclamosConDetalles = await Promise.all(
                reclamos.map(async (reclamo) => {
                    const estadoDescripcion = await this.reclamoService.getEstadoDescripcion(reclamo.idReclamoEstado);
                    return { ...reclamo, estadoDescripcion };
                })
            );

            // Generar el PDF y enviarlo como respuesta
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="informe_reclamos.pdf"');
            await PDFUtils.generarInformeReclamos(reclamosConDetalles, res);

        } catch (error) {
            console.error('Error al generar el informe de reclamos en PDF:', error);
            res.status(500).json({ message: 'Error al generar el informe de reclamos en PDF', error: error.message });
        }
    };

    consultarEstadoReclamo = async (req, res) => {
        const { idReclamo } = req.params;
        try {
            const reclamo = await this.reclamoService.findById(idReclamo);
            if (!reclamo) {
                return res.status(404).json({ message: 'Reclamo no encontrado' });
            }
            res.status(200).json(reclamo);
        } catch (error) {
            console.error('Error al consultar el estado del reclamo:', error);
            res.status(500).json({ message: 'Error al consultar el estado del reclamo', error: error.message });
        }
    };

    cancelarReclamo = async (req, res) => {
        const { idReclamo } = req.params;
        try {
            const reclamo = await this.reclamoService.findById(idReclamo);
            if (!reclamo) return res.status(404).json({ message: 'Reclamo no encontrado' });
    
            await this.reclamoService.cancelar(idReclamo); 
            res.status(200).json({ message: 'Reclamo cancelado exitosamente' });
        } catch (error) {
            console.error('Error al cancelar el reclamo:', error);
            res.status(500).json({ message: 'Error al cancelar el reclamo', error: error.message });
        }
    };

    atenderReclamos = async (req, res) => {
        const { idEmpleado } = req.params; 
        try {
            const reclamos = await this.reclamoService.findByEmpleadoId(idEmpleado);
            res.status(200).json(reclamos);
        } catch (error) {
            console.error('Error al listar reclamos de la oficina:', error);
            res.status(500).json({ message: 'Error al listar reclamos de la oficina', error: error.message });
        }
    }; 
}
