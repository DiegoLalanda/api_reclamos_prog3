const { sendEmail } = require('../services/emailService');
const Reclamo = require('../models/Reclamo');
const Usuario = require('../models/Usuario');
const ReclamoTipo = require('../models/ReclamoTipo');
const ReclamoEstado = require('../models/ReclamoEstado');

const actualizarEstadoReclamo = async (req, res) => {
    const { idReclamo } = req.params;
    const { nuevoEstado } = req.body;
  
    try {
      // Buscar el reclamo por ID e incluir el estado y el tipo
      const reclamo = await Reclamo.findByPk(idReclamo, {
        include: [
          { model: ReclamoTipo, as: 'tipo' },
          { model: ReclamoEstado, as: 'estado' }
        ]
      });
  
      if (!reclamo) {
        return res.status(404).json({ message: 'Reclamo no encontrado' });
      }
  
      // Actualizar el estado del reclamo
      reclamo.idReclamoEstado = nuevoEstado;
      await reclamo.save();
  
      // Buscar el usuario creador del reclamo para enviar el correo
      const usuario = await Usuario.findByPk(reclamo.idUsuarioCreador);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Preparar el contexto para el correo electrónico
      const emailContext = {
        nombre: usuario.nombre,
        asunto: reclamo.asunto,
        estadoDescripcion: reclamo.estado.descripcion, // Descripción del estado
        tipoDescripcion: reclamo.tipo.descripcion,     // Descripción del tipo
        reclamoDescripcion: reclamo.descripcion        // Descripción del reclamo
      };
  
      // Enviar el correo electrónico
      await sendEmail(usuario.correoElectronico, 'Estado del reclamo actualizado', '../utils/statusChange.hbs', emailContext);
  
      res.status(200).json({ message: 'Estado del reclamo actualizado y correo enviado' });
    } catch (error) {
      console.error('Error al actualizar el estado del reclamo:', error);
      res.status(500).json({ message: 'Error al actualizar el estado del reclamo', error: error.message });
    }
};
  
  

module.exports = {
  actualizarEstadoReclamo,
};
