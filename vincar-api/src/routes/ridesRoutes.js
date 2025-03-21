import express, { Router } from 'express';
import ridesController from '../controllers/ridesController.js';

const ridesRoutes = express.Router();

ridesRoutes.get('/pedents', (req, res) => ridesController.getRidesPedents(req, res)); // Retorna todas as corridas pendentes
ridesRoutes.get('/passenger/:passenger_user_id/pendents', (req, res) =>  ridesController.getPassengerPendingRides(req, res) ); // Retorna todas as corridas pendentes de um passageiro
ridesRoutes.get('/', (req, res) => ridesController.getRides(req, res));  // Retorna todas as corridas
ridesRoutes.post('/', (req, res) => ridesController.createRide(req, res)); // Cria uma corrida
ridesRoutes.delete('/:id', (req, res) => ridesController.deleteRide(req, res)); // Deleta uma corrida
ridesRoutes.put('/:id/finish', (req, res) => ridesController.finishRide(req, res)); // Finaliza uma corrida
ridesRoutes.get('/driver/:driverUserId', (req, res) => ridesController.getDriverRides(req, res));   // Retorna todas as corridas de um motorista
ridesRoutes.get('/:id', (req, res) => ridesController.getRideById(req, res)); // Retorna uma corrida pelo id
ridesRoutes.put('/:id/accept', (req, res) => ridesController.acceptRide(req, res)); // Aceita uma corrida
ridesRoutes.put('/:id/cancel', (req, res) => ridesController.cancelRide(req, res)); // Cancela uma corrida
ridesRoutes.get('/passenger/history', (req, res) => ridesController.getPassengerHistory(req, res)); // Retorna o histórico de corridas de um passageiro
ridesRoutes.get('/driver/history', (req, res) => ridesController.getDriverHistory(req, res)); // Retorna o histórico de corridas de um motorista




export default ridesRoutes;