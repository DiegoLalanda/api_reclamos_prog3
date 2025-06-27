import EmpleadosServices from '../services/empleadosService.js';
import UsuariosOficinasService from '../services/usuariosOficinasService.js';

export default class EmpleadosController {
    constructor() {
        this.empleadosService = new EmpleadosServices();
        this.usuariosOficinasService = new UsuariosOficinasService(); // Instanciamos el nuevo servicio.
    }

    findAll = async (req, res) => {
        try {
            const { nombre, apellido, limit, offset, order, asc } = req.query;

            const pLimit = limit ? Number(limit) : 0;
            const pOffset = offset ? Number(offset) : 0;
            const pOrder = order || "idUsuario";
            const pAsc = asc === "false" ? false : true;

            const empleados = await this.empleadosService.findAll({ nombre, apellido }, pLimit, pOffset, pOrder, pAsc);
            res.status(200).json({ status: "Success", data: empleados });
        } catch (error) {
            console.error('Error en findAll:', error);
            res.status(500).json({ status: "Error", message: error.message || 'Fallo en la obtención de empleados.' });
        }
    };

    findById = async (req, res) => {
        const { id } = req.params;
        try {
            const empleado = await this.empleadosService.findById(id);
            if (!empleado) {
                return res.status(404).json({ status: "Not Found", message: 'Empleado no encontrado.' });
            }
            res.status(200).json({ status: "Success", data: empleado });
        } catch (error) {
            console.error('Error en findById:', error);
            res.status(500).json({ status: "Error", message: 'Error al obtener el empleado.' });
        }
    };

    create = async (req, res) => {
        try {
            const { nombre, apellido, correoElectronico, contrasenia, imagen, idOficina } = req.body;

            if (!nombre || !apellido || !correoElectronico || !contrasenia) {
                return res.status(400).json({
                    status: "Fallo",
                    data: { error: "Uno de los siguientes datos falta o es vacío: 'nombre', 'apellido', 'correoElectronico', 'contrasenia'." }
                });
            }

            // El hasheo de la contraseña ahora lo hace el modelo de Sequelize automáticamente (hook 'beforeCreate').
            // Por lo tanto, no necesitamos hashear aquí.
            const nuevoEmpleado = await this.empleadosService.create({
                nombre,
                apellido,
                correoElectronico,
                contrasenia, // La pasamos en texto plano, el modelo se encarga.
                imagen: imagen || null
            });

            // Si se proporciona un idOficina, creamos la asignación a través del servicio.
            if (idOficina && nuevoEmpleado) {
                await this.usuariosOficinasService.create({
                    idUsuario: nuevoEmpleado.idUsuario,
                    idOficina: idOficina,
                });
            }

            res.status(201).json({ status: "OK", data: nuevoEmpleado });
        } catch (error) {
            // Manejo de errores de Sequelize, como un correo duplicado.
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ status: "Fallo", data: { error: "El correo electrónico ya está en uso." } });
            }
            res.status(error?.status || 500).json({ status: "Fallo", data: { error: error?.message || error } });
        }
    };

    update = async (req, res) => {
        const { id } = req.params;
        const empleadoData = req.body;
        try {
            const updatedEmpleado = await this.empleadosService.update(id, empleadoData);
            if (!updatedEmpleado) {
                return res.status(404).json({ status: "Not Found", message: 'Empleado no encontrado para actualizar.' });
            }
            res.status(200).json({ status: "Success", data: updatedEmpleado });
        } catch (error) {
            console.error('Error en update:', error);
            res.status(400).json({ status: "Error", message: error.message || 'Error al actualizar el empleado.' });
        }
    };

    destroy = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.empleadosService.destroy(id);
            if (!result) {
                return res.status(404).json({ status: "Not Found", message: 'Empleado no encontrado para desactivar.' });
            }
            res.status(204).send();
        } catch (error) {
            console.error('Error en destroy:', error);
            res.status(500).json({ status: "Error", message: 'Error al eliminar el empleado.' });
        }
    }
}