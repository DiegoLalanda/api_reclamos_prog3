import { body, param } from 'express-validator';

// Validaciones para la creación de una oficina
const createOficinaValidator = [
    body('nombre')
        .notEmpty().withMessage('El nombre de la oficina es obligatorio.')
        .isLength({ max: 256 }).withMessage('El nombre no debe exceder 256 caracteres.'),
    body('idReclamoTipo')
        .notEmpty().withMessage('El tipo de reclamo asociado es obligatorio.')
        .isInt().withMessage('El tipo de reclamo debe ser un número entero.'),
    body('activo')
        .notEmpty().withMessage('El estado activo es obligatorio.')
        .isInt({ min: 0, max: 1 }).withMessage('El estado activo debe ser 0 (inactivo) o 1 (activo).')
];

// Validaciones para la actualización de una oficina
const updateOficinaValidator = [
    param('id')
        .isInt().withMessage('El ID de la oficina debe ser un número entero.'),
    body('nombre')
        .optional()
        .isLength({ max: 256 }).withMessage('El nombre no debe exceder 256 caracteres.'),
    body('idReclamoTipo')
        .optional()
        .isInt().withMessage('El tipo de reclamo debe ser un número entero.'),
    body('activo')
        .optional()
        .isInt({ min: 0, max: 1 }).withMessage('El estado activo debe ser 0 (inactivo) o 1 (activo).')
];

export { createOficinaValidator, updateOficinaValidator };

