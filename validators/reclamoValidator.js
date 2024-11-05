import { body, param } from 'express-validator';
import ReclamosTipoService from '../services/reclamosTipoService.js';

// Validaciones para la creación de un reclamo
const createReclamoValidator = [
    body('asunto')
        .notEmpty().withMessage('El asunto es obligatorio.')
        .isLength({ max: 256 }).withMessage('El asunto no debe exceder 256 caracteres.'),
    
    body('descripcion')
        .optional()
        .isLength({ max: 256 }).withMessage('La descripción no debe exceder 256 caracteres.'),

    body('idReclamoTipo')
        .notEmpty().withMessage('El tipo de reclamo es obligatorio.')
        .isInt().withMessage('El tipo de reclamo debe ser un número entero.')
        .custom(async (idReclamoTipo) => {
            const reclamosTipoService = new ReclamosTipoService();
            const tipoExiste = await reclamosTipoService.exists(idReclamoTipo);
            if (!tipoExiste) {
                throw new Error('El tipo de reclamo no es válido.');
            }
        }),

    body('fechaCreado').not().exists().withMessage('La fecha de creación se asignará automáticamente.'),
    body('idUsuarioCreador').not().exists().withMessage('El usuario creador se asignará automáticamente.'),
];

// Validaciones para la actualización de un reclamo
const updateReclamoValidator = [
    param('id')
        .isInt().withMessage('El ID del reclamo debe ser un número entero.'),
    body('estado')
        .notEmpty().withMessage('El estado del reclamo es obligatorio.')
        .isIn(['creado', 'en proceso', 'finalizado', 'cancelado']).withMessage('Estado inválido.'),
];

// Validación para el cambio de estado del reclamo
const updateEstadoReclamoValidator = [
    body('nuevoEstado')
        .notEmpty().withMessage('El nuevo estado es obligatorio.')
        .isInt({ min: 1, max: 4 }).withMessage('Estado inválido. Las opciones válidas son: 1 (Creado), 2 (En Proceso), 3 (Cancelado), 4 (Finalizado).'),
];

export { createReclamoValidator, updateReclamoValidator, updateEstadoReclamoValidator };
