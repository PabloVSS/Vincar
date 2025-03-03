import express from 'express';
import { usersController } from '../models/users.module.js';

const userRoutes = express.Router();

userRoutes.post('/', (req, res, next) => usersController.createUser(req, res, next));
userRoutes.get('/', (req, res, next) => usersController.getAllUsers(req, res, next));
userRoutes.patch('/:id', (req, res, next) => usersController.updateUser(req, res, next));
userRoutes.delete('/:id', (req, res, next) => usersController.deleteUser(req, res, next));


export default userRoutes;