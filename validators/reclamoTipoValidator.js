import { body, param } from 'express-validator';

// Validaciones para la creación de un Reclamo Tipo
const createReclamosTipoValidator = [
    body('descripcion')
        .notEmpty().withMessage('La descripción es obligatoria.')
        .isLength({ max: 256 }).withMessage('La descripción no debe exceder 256 caracteres.'),
    body('activo')
        .notEmpty().withMessage('El estado activo es obligatorio.')
        .isInt({ min: 0, max: 1 }).withMessage('El estado activo debe ser 0 (inactivo) o 1 (activo).')
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
        .isInt({ min: 0, max: 1 }).withMessage('El estado activo debe ser 0 (inactivo) o 1 (activo).')
];

export { createReclamosTipoValidator, updateReclamosTipoValidator };
