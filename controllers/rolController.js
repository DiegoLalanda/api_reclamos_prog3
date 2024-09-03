const UsuariosTipo = require('../models/UsuarioTipo');


exports.getAllUsuariosTipo = async (req, res) => {
  try {
    const usuariosTipo = await UsuariosTipo.findAll();
    res.status(200).json(usuariosTipo);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los tipos de usuario', error });
  }
};


exports.getUsuarioTipoById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioTipo = await UsuariosTipo.findByPk(id);
    if (usuarioTipo) {
      res.status(200).json(usuarioTipo);
    } else {
      res.status(404).json({ message: 'Tipo de usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el tipo de usuario', error });
  }
};


exports.createUsuarioTipo = async (req, res) => {
  try {
    const { descripcion, activo } = req.body;
    const nuevoUsuarioTipo = await UsuariosTipo.create({ descripcion, activo });
    res.status(201).json(nuevoUsuarioTipo);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el tipo de usuario', error });
  }
};

exports.updateUsuarioTipo = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, activo } = req.body;
    const usuarioTipo = await UsuariosTipo.findByPk(id);
    if (usuarioTipo) {
      await usuarioTipo.update({ descripcion, activo });
      res.status(200).json(usuarioTipo);
    } else {
      res.status(404).json({ message: 'Tipo de usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el tipo de usuario', error });
  }
};

exports.deleteUsuarioTipo = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioTipo = await UsuariosTipo.findByPk(id);
    if (usuarioTipo) {
      await usuarioTipo.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Tipo de usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el tipo de usuario', error });
  }
};
