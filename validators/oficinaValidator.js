import { body, param } from 'express-validator';

// Validación para la creación de una oficina
const createOficinaValidator = [
    body('nombre')
        .notEmpty().withMessage('El nombre de la oficina es obligatorio.')
        .isLength({ max: 256 }).withMessage('El nombre no debe exceder 256 caracteres.'),
    body('direccion')
        .optional()
        .isLength({ max: 256 }).withMessage('La dirección no debe exceder 256 caracteres.'),
];

// Validación para la actualización de una oficina
const updateOficinaValidator = [
    param('id')
        .isInt().withMessage('El ID de la oficina debe ser un número entero.'),
    body('nombre')
        .optional()
        .isLength({ max: 256 }).withMessage('El nombre no debe exceder 256 caracteres.'),
    body('direccion')
        .optional()
        .isLength({ max: 256 }).withMessage('La dirección no debe exceder 256 caracteres.'),
];

export { createOficinaValidator, updateOficinaValidator };
