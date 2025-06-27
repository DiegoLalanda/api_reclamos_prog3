import UsuariosServices from "../services/usuariosService.js";

export default class UsuariosController {
    constructor() {
        this.service = new UsuariosServices();  
    }

    findAll = async (req, res) => {
        try {
            const { nombre, apellido, limit, offset, order, asc } = req.query;

            const pLimit = limit ? Number(limit) : 0;
            const pOffset = offset ? Number(offset) : 0;
            const pOrder = order || "idUsuario";
            const pAsc = asc === "false" ? false : true;

            // Filtramos para obtener solo clientes (tipo 3)
            const users = await this.service.findAll({ nombre, apellido, idTipoUsuario: 3 }, pLimit, pOffset, pOrder, pAsc);

            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ status: "Fallo", data: { error: error.message || error } });
        }
    };

    findById = async (req, res) => {
        try {
            const { id } = req.params;
    
            if (!id) {
                return res.status(404).json({ status: "Fallo", data: { error: "El parámetro id no puede ser vacío." } });
            }
    
            const user = await this.service.findById(id);
    
            if (!user) {
                return res.status(404).json({ status: "Fallo", data: { error: "Usuario no encontrado." } });
            }
    
            const isAdminReq = req.user && req.user.idTipoUsuario === 1;
    
            const responseData = isAdminReq
                ? user.get({ plain: true })
                : {
                      nombre: user.nombre,
                      apellido: user.apellido,
                      correoElectronico: user.correoElectronico,
                  };
    
            res.status(200).json({ status: "OK", data: responseData });
        } catch (error) {
            res.status(500).json({ status: "Fallo", data: { error: error.message || error } });
        }
    };    

    // Este método ahora es específicamente para crear CLIENTES
    create = async (req, res) => {
        try {
            const { nombre, apellido, correoElectronico, contrasenia, imagen } = req.body;
    
            if (!nombre || !apellido || !correoElectronico || !contrasenia) {
                return res.status(400).json({
                    status: "Fallo",
                    data: { error: "Todos los campos son requeridos." }
                });
            }
    
            // El hasheo lo hace el modelo. Pasamos el tipo de usuario CLIENTE (3)
            const newUser = await this.service.create({
                nombre,
                apellido,
                correoElectronico,
                contrasenia,
                idTipoUsuario: 3, // Siempre 3 para el registro de clientes
                imagen: imagen || null
            });
    
            res.status(201).json({ status: "OK", data: newUser });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ status: "Fallo", data: { error: "El correo electrónico ya está en uso." } });
            }
            res.status(error?.status || 500).json({ status: "Fallo", data: { error: error?.message || error } });
        }
    };  

    // ¡NUEVO MÉTODO! Para crear administradores
    createAdmin = async (req, res) => {
        try {
            const { nombre, apellido, correoElectronico, contrasenia, imagen } = req.body;
    
            if (!nombre || !apellido || !correoElectronico || !contrasenia) {
                return res.status(400).json({
                    status: "Fallo",
                    data: { error: "Todos los campos son requeridos." }
                });
            }

            // El hasheo lo hace el modelo. Pasamos el tipo de usuario ADMIN (1)
            const newAdmin = await this.service.create({
                nombre,
                apellido,
                correoElectronico,
                contrasenia,
                idTipoUsuario: 1, // Siempre 1 para el registro de administradores
                imagen: imagen || null
            });
    
            res.status(201).json({ status: "OK", data: newAdmin });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ status: "Fallo", data: { error: "El correo electrónico ya está en uso." } });
            }
            res.status(error?.status || 500).json({ status: "Fallo", data: { error: error?.message || error } });
        }
    };

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, apellido, correoElectronico, idTipoUsuario, imagen } = req.body;
    
            if (!id || isNaN(id)) {
                return res.status(404).json({ status: "Fallo", data: { error: "El parámetro id no puede ser vacío o no es un número." } });
            }
    
            const updateFields = {};
            if (nombre !== undefined) updateFields.nombre = nombre; 
            if (apellido !== undefined) updateFields.apellido = apellido;
            if (correoElectronico !== undefined) updateFields.correoElectronico = correoElectronico;
            if (idTipoUsuario !== undefined) updateFields.idTipoUsuario = idTipoUsuario;
            if (imagen !== undefined) updateFields.imagen = imagen;
    
            if (Object.keys(updateFields).length === 0) {
                return res.status(400).json({ status: "Fallo", data: { error: "No hay campos para actualizar." } });
            }
    
            const existingUser = await this.service.findById(id);
            if (!existingUser) {
                return res.status(404).json({ status: "Fallo", data: { error: "Usuario no encontrado." } });
            }
    
            const updatedUser = await this.service.update(id, updateFields);
            res.status(200).json({ status: "OK", data: updatedUser });
        } catch (error) {
            console.error("Error en el controlador:", error);
            res.status(500).json({ status: "Fallo", data: { error: error?.message || "Error en el servidor" } });
        }
    };
    
    destroy = async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(404).json({ status: "Fallo", data: { error: "El parámetro id no puede ser vacío." } });
            }

            await this.service.destroy(id);

            res.status(204).send();  
        } catch (error) {
            res.status(error?.status || 500).json({ status: "Fallo", data: { error: error?.message || error } });
        }
    };
}
