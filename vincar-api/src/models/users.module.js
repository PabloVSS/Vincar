import UserService from '../services/users.service.js';
import UserController from '../controllers/usersController.js'; 

const usersService = new UserService();
const usersController = new UserController(usersService);

export { usersController, usersService };