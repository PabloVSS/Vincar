import { authController } from '../models/auth.module.js';

import express from 'express';

const authRoutes = express.Router();

authRoutes.post('/login', (req, res) => authController.login(req, res));

export default authRoutes;