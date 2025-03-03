import { ridesController } from '../models/rides.module.js';
import express from 'express';

const ridesRoutes = express.Router();

ridesRoutes.get('/', (req, res) => ridesController.getRides(req, res));
ridesRoutes.post('/', (req, res) => ridesController.createRide(req, res));
ridesRoutes.delete('/:id', (req, res) => ridesController.deleteRide(req, res));
ridesRoutes.put('/:id/finish', (req, res) => ridesController.finishRide(req, res));
ridesRoutes.get('/drivers/:driverUserId', (req, res) => ridesController.getDriverRides(req, res));
ridesRoutes.get('/:id', (req, res) => ridesController.getRideById(req, res));
ridesRoutes.put('/:id/accept', (req, res) => ridesController.acceptRide(req, res));
ridesRoutes.put('/:id/cancel', (req, res) => ridesController.cancelRide(req, res));

export default ridesRoutes;