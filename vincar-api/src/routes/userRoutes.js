import express from 'express';
import UsersController from '../controllers/usersController.js';
import UsersService from '../services/users.service.js';

const userRoutes = express.Router();
const usersService = new UsersService(); 
const usersController = new UsersController(usersService); 
userRoutes.post('/', usersController.createUser.bind(usersController)); // Cria um usuário
userRoutes.get('/', usersController.getAllUsers.bind(usersController));   // Retorna todos os usuários
userRoutes.get('/profile', usersController.getUserProfile.bind(usersController)); // Retorna o perfil do usuário
userRoutes.put('/:id', usersController.updateUser.bind(usersController)); // Atualiza um usuário
userRoutes.delete('/:id', usersController.deleteUser.bind(usersController)); // Deleta um usuário

export default userRoutes;