// authRoutes.js
import express from 'express';
import authController from '../controllers/authController.js';

const authRoutes = express.Router();

authRoutes.post('/login', authController.login); // Rota para login
authRoutes.post('/generate-reset-token', authController.generateResetToken); // Rota para gerar token de reset de senha
authRoutes.post('/reset-password/:resetToken', authController.resetPassword); // Rota para resetar a senha

export default authRoutes;