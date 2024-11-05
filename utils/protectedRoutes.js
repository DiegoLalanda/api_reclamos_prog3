import express from 'express';
import passport from 'passport';

const protectedRoutes = express.Router();

protectedRoutes.use(passport.authenticate('jwt', { session: false }));

export default protectedRoutes;