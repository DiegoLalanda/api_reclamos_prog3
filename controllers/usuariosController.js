import bcrypt from 'bcrypt';
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

            const users = await this.service.findAll({ nombre, apellido }, pLimit, pOffset, pOrder, pAsc);

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

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ status: "Fallo", data: { error: error.message || error } });
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
                idTipoUsuario: 1,
                imagen: imagen || null
            });
    
            res.status(201).json({ status: "OK", data: newUser });
        } catch (error) {
            res.status(error?.status || 500).json({ status: "Fallo", data: { error: error?.message || error } });
        }
    };    

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, apellido, correoElectronico, idTipoUsuario, imagen } = req.body;

            if (!id) {
                return res.status(404).json({ status: "Fallo", data: { error: "El parámetro id no puede ser vacío." } });
            }

            const updatedUser = await this.service.update(id, { nombre, apellido, correoElectronico, idTipoUsuario, imagen });

            res.status(200).json({ status: "OK", data: updatedUser });
        } catch (error) {
            res.status(error?.status || 500).json({ status: "Fallo", data: { error: error?.message || error } });
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
