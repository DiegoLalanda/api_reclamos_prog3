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
        try {
            const { nombre, apellido, correoElectronico, contrasenia, imagen } = req.body;
    
            if (!nombre || !apellido || !correoElectronico || !contrasenia) {
                return res.status(400).json({
                    status: "Fallo",
                    data: { error: "Uno de los siguientes datos falta o es vacío: 'nombre', 'apellido', 'correoElectronico', 'contrasenia'." }
                });
            }
    
            const hashedPassword = await bcrypt.hash(contrasenia, 10); 
    
            const newUser = await this.service.create({
                nombre,
                apellido,
                correoElectronico,
                contrasenia: hashedPassword,
                idTipoUsuario: 2,
                imagen: imagen || null
            });
    
            res.status(201).json({ status: "OK", data: newUser });
        } catch (error) {
            res.status(error?.status || 500).json({ status: "Fallo", data: { error: error?.message || error } });
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
            res.status(204).send(); 
        } catch (error) {
            console.error('Error en destroy:', error);
            res.status(500).json({ status: "Error", message: 'Error al eliminar el empleado.' });
        }
    }
}