import EmpleadosServices from '../services/empleadosService.js';

export default class EmpleadosController {
    constructor() {
        this.service = new EmpleadosServices(); 
    }

    findAll = async (req, res) => {
        try {
            const { nombre, apellido, limit, offset, order, asc } = req.query;

            const pLimit = limit ? Number(limit) : 0;
            const pOffset = offset ? Number(offset) : 0;
            const pOrder = order || "idUsuario";
            const pAsc = asc === "false" ? false : true;

            const empleados = await this.service.findAll({ nombre, apellido }, pLimit, pOffset, pOrder, pAsc);
            res.status(200).json({ status: "Success", data: empleados });
        } catch (error) {
            console.error('Error en findAll:', error);
            res.status(500).json({ status: "Error", message: error.message || 'Fallo en la obtención de empleados.' });
        }
    };

    findById = async (req, res) => {
        const { id } = req.params; 
        try {
            const empleado = await this.service.findById(id);
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
        const empleado = {
            ...req.body,
            idTipoUsuario: 2
        }; 
        try {
            const newEmpleado = await this.service.create(empleado);
            res.status(201).json({ status: "Created", data: newEmpleado });
        } catch (error) {
            console.error('Error en create:', error);
            res.status(400).json({ status: "Error", message: error.message || 'Error al crear el empleado.' });
        }
    };

    update = async (req, res) => {
        const { id } = req.params; 
        const empleadoData = req.body; 
    
        try {
            const updatedEmpleado = await this.service.update(id, empleadoData);
            res.status(200).json({ status: "Success", data: updatedEmpleado });
        } catch (error) {
            console.error('Error en update:', error);
            res.status(400).json({ status: "Error", message: error.message || 'Error al actualizar el empleado.' });
        }
    };    

    destroy = async (req, res) => {
        const { id } = req.params; 
        try {
            await this.service.destroy(id);
            res.status(200).json({ status: "Success", message: "Empleado eliminado correctamente." }); 
        } catch (error) {
            console.error('Error en destroy:', error);
            res.status(500).json({ status: "Error", message: 'Error al eliminar el empleado.' });
        }
    };    
}