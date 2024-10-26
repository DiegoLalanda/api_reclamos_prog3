import { body, param } from 'express-validator';

// Validaciones para la creación de un Reclamo Tipo
const createReclamosTipoValidator = [
    body('descripcion')
        .notEmpty().withMessage('La descripción es obligatoria.')
        .isLength({ max: 256 }).withMessage('La descripción no debe exceder 256 caracteres.'),
    body('activo')
        .isBoolean().withMessage('El estado activo debe ser un valor booleano (true o false).'), // Para asegurarse de que es un booleano
];

// Validaciones para la actualización de un Reclamo Tipo
const updateReclamosTipoValidator = [
    param('id')
        .isInt().withMessage('El ID del Reclamo Tipo debe ser un número entero.'),
    body('descripcion')
        .optional()
        .isLength({ max: 256 }).withMessage('La descripción no debe exceder 256 caracteres.'),
    body('activo')
        .optional()
        .isBoolean().withMessage('El estado activo debe ser un valor booleano (true o false).'),
];

export { createReclamosTipoValidator, updateReclamosTipoValidator };
