// models/auth.module.js
import AuthService from '../services/auth.service.js';
import AuthController from '../controllers/authController.js';

// Crie primeiro o service
const authService = new AuthService();

// Passe o service para o controller
const authController = new AuthController(authService);

// Exporte ambos se necessário
export {
  authController,
  authService
};