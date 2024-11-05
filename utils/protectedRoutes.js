import express from 'express';
import passport from 'passport';

const protectedRoutes = express.Router();

protectedRoutes.use((req, res, next) => {
    console.log('Usuario autenticado:', req.user); // Añadir este log
    passport.authenticate('jwt', { session: false })(req, res, next);
});

export default protectedRoutes;