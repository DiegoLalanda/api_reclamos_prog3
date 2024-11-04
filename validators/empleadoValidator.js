import { body, param } from 'express-validator';

const createEmpleadoValidator = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ max: 256 }).withMessage('El nombre no debe exceder 256 caracteres.'),
    body('apellido')
        .notEmpty().withMessage('El apellido es obligatorio.')
        .isLength({ max: 256 }).withMessage('El apellido no debe exceder 256 caracteres.'),
    body('correoElectronico')
        .notEmpty().withMessage('El correo electrónico es obligatorio.')
        .isEmail().withMessage('El correo electrónico no es válido.')
        .isLength({ max: 256 }).withMessage('El correo electrónico no debe exceder 256 caracteres.'),
    body('contrasenia')
        .notEmpty().withMessage('La contraseña es obligatoria.')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    body('idTipoUsuario')
        .notEmpty().withMessage('El tipo de usuario es obligatorio.')
        .isInt().withMessage('El tipo de usuario debe ser un número entero.'),
    body('imagen')
        .optional()
        .isLength({ max: 256 }).withMessage('La ruta de la imagen no debe exceder 256 caracteres.'),
    body('activo')
        .optional()
        .isBoolean().withMessage('El estado activo debe ser un valor booleano.'),
];

const updateEmpleadoValidator = [
    param('id')
        .isInt().withMessage('El ID del empleado debe ser un número entero.'),
    body('nombre')
        .optional()
        .isLength({ max: 256 }).withMessage('El nombre no debe exceder 256 caracteres.'),
    body('apellido')
        .optional()
        .isLength({ max: 256 }).withMessage('El apellido no debe exceder 256 caracteres.'),
    body('correoElectronico')
        .optional()
        .isEmail().withMessage('El correo electrónico no es válido.')
        .isLength({ max: 256 }).withMessage('El correo electrónico no debe exceder 256 caracteres.'),
    body('contrasenia')
        .optional()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    body('idTipoUsuario')
        .optional()
        .isInt().withMessage('El tipo de usuario debe ser un número entero.'),
    body('imagen')
        .optional()
        .isLength({ max: 256 }).withMessage('La ruta de la imagen no debe exceder 256 caracteres.'),
    body('activo')
        .optional()
        .isBoolean().withMessage('El estado activo debe ser un valor booleano.'),
];

export { createEmpleadoValidator, updateEmpleadoValidator };