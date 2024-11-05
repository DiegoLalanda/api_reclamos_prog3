// errorMiddleware.js
import { validationResult } from 'express-validator';

const errorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status: 'Fallo', 
            data: { errors: errors.array() }
        });
    }
    next();
};

export default errorMiddleware;
