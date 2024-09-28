import ReclamoService from '../services/reclamosService.js';
import EmailService from '../services/emailService.js';

export default class ReclamosController {
    constructor() {
        this.reclamoService = new ReclamoService();
        this.emailService = new EmailService();
    }

    actualizarEstadoReclamo = async (req, res) => {
        const { idReclamo } = req.params;
        const { nuevoEstado } = req.body;

        try {
            // Buscar el reclamo por ID
            const reclamo = await this.reclamoService.findById(idReclamo);
            if (!reclamo) {
                return res.status(404).json({ message: 'Reclamo no encontrado' });
            }

            // Actualizar el estado del reclamo usando `updateEstado`
            await this.reclamoService.updateEstado(idReclamo, nuevoEstado);

            // Buscar el usuario creador del reclamo para enviar el correo
            const usuario = await this.reclamoService.findUsuarioById(reclamo.idUsuarioCreador);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Obtener la descripción del nuevo estado a partir del ID
            const estadoDescripcion = await this.reclamoService.getEstadoDescripcion(nuevoEstado);

            // Obtener la descripción del tipo de reclamo a partir del ID de reclamo.tipo
            const tipoDescripcion = await this.reclamoService.getTipoDescripcion(reclamo.idReclamoTipo);

            // Preparar el contexto para el correo electrónico
            const emailContext = {
                nombre: usuario.nombre,
                asunto: reclamo.asunto,
                estadoDescripcion: `El estado del reclamo se ha actualizado a: ${estadoDescripcion}`,
                tipoDescripcion: tipoDescripcion || "Tipo no especificado",
                reclamoDescripcion: reclamo.descripcion,
            };

            // Enviar el correo electrónico usando EmailService
            const templatePath = '../utils/statusChange.hbs'; // Ruta de la plantilla
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
}
