const { Usuario, UsuarioTipo } = require('../models');

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen } = req.body;

    const newUser = await Usuario.create({
      nombre,
      apellido,
      correoElectronico,
      contrasenia, // Recuerda que deberías encriptar la contraseña antes de guardarla
      idTipoUsuario,
      imagen
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await Usuario.findAll({
      include: { model: UsuarioTipo, attributes: ['descripcion'] }
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({
      message: "Error al obtener los usuarios",
      error: error.message || error,
    });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Usuario.findByPk(id, {
      include: { model: UsuarioTipo, attributes: ['descripcion'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, correoElectronico, idTipoUsuario, imagen } = req.body;

    const user = await Usuario.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.nombre = nombre;
    user.apellido = apellido;
    user.correoElectronico = correoElectronico;
    user.idTipoUsuario = idTipoUsuario;
    user.imagen = imagen;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Usuario.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();

    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
