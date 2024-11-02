import { body, param } from 'express-validator';

const registerValidator = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ max: 256 }).withMessage('El nombre no debe exceder 256 caracteres.'),
    body('apellido')
        .notEmpty().withMessage('El apellido es obligatorio.')
        .isLength({ max: 256 }).withMessage('El apellido no debe exceder 256 caracteres.'),
    body('correoElectronico')
        .notEmpty().withMessage('El correo electrónico es obligatorio.')
        .isEmail().withMessage('El formato del correo electrónico es inválido.')
        .isLength({ max: 256 }).withMessage('El correo electrónico no debe exceder 256 caracteres.'),
    body('contrasenia')
        .notEmpty().withMessage('La contraseña es obligatoria.')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.'),
    body('imagen')
        .optional()
        .isLength({ max: 256 }).withMessage('La ruta de la imagen no debe exceder 256 caracteres.')
];

const updateUsuarioValidator = [
    param('id')
        .notEmpty().withMessage('El ID del usuario es obligatorio.')
        .isInt().withMessage('El ID debe ser un número entero.'),
    body('nombre')
        .optional()
        .isLength({ max: 256 }).withMessage('El nombre no debe exceder 256 caracteres.'),
    body('apellido')
        .optional()
        .isLength({ max: 256 }).withMessage('El apellido no debe exceder 256 caracteres.'),
    body('correoElectronico')
        .optional()
        .isEmail().withMessage('El formato del correo electrónico es inválido.')
        .isLength({ max: 256 }).withMessage('El correo electrónico no debe exceder 256 caracteres.'),
    body('idTipoUsuario')
        .optional()
        .isInt().withMessage('El tipo de usuario debe ser un número entero.'),
    body('imagen')
        .optional()
        .isLength({ max: 256 }).withMessage('La ruta de la imagen no debe exceder 256 caracteres.')
];

export { registerValidator, updateUsuarioValidator };
