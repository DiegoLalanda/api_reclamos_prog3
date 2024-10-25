import { body, param } from 'express-validator';

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
        .isInt().withMessage('El tipo de reclamo debe ser un número entero.'),
];

// Validaciones para la actualización de un reclamo
const updateReclamoValidator = [
    param('id')
        .isInt().withMessage('El ID del reclamo debe ser un número entero.'),
    body('estado')
        .notEmpty().withMessage('El estado del reclamo es obligatorio.')
        .isIn(['creado', 'en proceso', 'finalizado', 'cancelado']).withMessage('Estado inválido.'),
];

export { createReclamoValidator, updateReclamoValidator };
