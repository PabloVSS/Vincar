import jwt from 'jsonwebtoken';
import ridesService from '../services/rides.service.js';

class RidesController {
    constructor() {
        this.ridesService =  ridesService;
        
        // Vincular todos os métodos
        this.getRides = this.getRides.bind(this);
        this.getRidesPedents = this.getRidesPedents.bind(this);
        this.createRide = this.createRide.bind(this);
        this.deleteRide = this.deleteRide.bind(this);
        this.finishRide = this.finishRide.bind(this);
        this.getDriverRides = this.getDriverRides.bind(this);
        this.getRideById = this.getRideById.bind(this);
        this.acceptRide = this.acceptRide.bind(this);
        this.cancelRide = this.cancelRide.bind(this);
        this.getRidesByPassenger = this.getRidesByPassenger.bind(this);
        this.getPassengerHistory = this.getPassengerHistory.bind(this);
        this.getDriverHistory = this.getDriverHistory.bind(this);
    }

    extractUserIdFromToken(token) {
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) throw new Error('Chave secreta JWT não configurada');
        
        try {
            const decoded = jwt.verify(token, secretKey);
            if (!decoded?.userId) throw new Error('Token inválido: userId não encontrado');
            return decoded.userId;
        } catch (error) {
            console.error('Erro na decodificação do token:', error.message);
            throw new Error('Falha na autenticação');
        }
    }

    async getRides(req, res) {
        try {
            const filters = req.query;
            const rides = await this.ridesService.getRides(filters);
            res.json({ success: true, data: rides });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    async getRidesPedents(req, res) {
        try {
            const rides = await this.ridesService.getRidesPedents(req.query); // Ajuste para a função correta
            res.json({ success: true, data: rides });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getPassengerPendingRides(req, res) {
        try {
            const { passenger_user_id } = req.params;
    
            if (!passenger_user_id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID do passageiro não fornecido'
                });
            }
    
            const rides = await this.ridesService.getRidesByPassenger(passenger_user_id);
    
            if (!rides || rides.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Nenhuma corrida pendente encontrada'
                });
            }
    
            const pendingRides = rides.filter(ride => ride.status === 'P'); // Apenas corridas pendentes
    
            res.json({ success: true, data: pendingRides });
        } catch (error) {
            console.error('Erro ao buscar corridas pendentes do passageiro:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar corridas pendentes'
            });
        }
    }
    
    async createRide(req, res) {
        try {

            const requiredFields = [
                'pickup_address', 
                'dropoff_address', 
                'pickup_latitude', 
                'pickup_longitude'
            ];
            
            const missingFields = requiredFields.filter(field => !req.body[field]);
            if (missingFields.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: `Campos obrigatórios faltando: ${missingFields.join(', ')}`
                });
            }

            const authHeader = req.headers.authorization;
            if (!authHeader?.startsWith('Bearer ')) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Formato de token inválido' 
                });
            }

            const token = authHeader.split(' ')[1];
            const passenger_user_id = this.extractUserIdFromToken(token);

            const rideData = {
                passenger_user_id,
                pickup_address: req.body.pickup_address,
                dropoff_address: req.body.dropoff_address,
                pickup_latitude: parseFloat(req.body.pickup_latitude),
                pickup_longitude: parseFloat(req.body.pickup_longitude),
                ...(req.body.driver_user_id && { driver_user_id: req.body.driver_user_id })
            };

            const newRide = await this.ridesService.createRide(rideData);
            
            res.status(201).json({
                success: true,
                data: newRide,
                message: 'Corrida criada com sucesso'
            });

        } catch (error) {
            console.error("Erro ao criar corrida:", error);
            const statusCode = error.message.includes('Token') ? 401 : 500;
            res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteRide(req, res) {
        try {
            const rideId = req.params.id;
            await this.ridesService.deleteRide(rideId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async finishRide(req, res) {
        try {
            const rideId = req.params.id;
            const driverUserId = req.body.driver_user_id;
            const updatedRide = await this.ridesService.finishRide(rideId, driverUserId);
            res.json({ success: true, data: updatedRide });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getDriverRides(req, res) {
        try {
            const driverUserId = req.params.driverUserId;
            const rides = await this.ridesService.getDriverRides(driverUserId);
            res.json({ success: true, data: rides });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getRideById(req, res) {
        try {
            const rideId = req.params.id;
            const ride = await this.ridesService.getRideById(rideId);
            
            if (!ride) {
                return res.status(404).json({
                    success: false,
                    message: 'Corrida não encontrada'
                });
            }
            
            res.json({ success: true, data: ride });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async acceptRide(req, res) {
        try {
            const rideId = req.params.id;
            const driverUserId = req.body.driver_user_id;
            const updatedRide = await this.ridesService.acceptRide(rideId, driverUserId);
            res.json({ success: true, data: updatedRide });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async cancelRide(req, res) {
        try {
            const rideId = req.params.id;
            const updatedRide = await this.ridesService.cancelRide(rideId);
            res.json({ success: true, data: updatedRide });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getRidesByPassenger(req, res) {
        try {
            const passenger_user_id = req.params.passenger_user_id;
            const rides = await this.ridesService.getRidesByPassenger(passenger_user_id);
            res.json({ success: true, data: rides });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    async getPassengerHistory(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader?.startsWith('Bearer ')) {
                return res.status(401).json({
                    success: false,
                    message: 'Formato de token inválido'
                });
            }

            const token = authHeader.split(' ')[1];
            const passengerUserId = this.extractUserIdFromToken(token);
            const history = await this.ridesService.getPassengerHistory(passengerUserId);
            
            res.json({ success: true, data: history });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getDriverHistory(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader?.startsWith('Bearer ')) {
                return res.status(401).json({
                    success: false,
                    message: 'Formato de token inválido'
                });
            }

            const token = authHeader.split(' ')[1];
            const driverUserId = this.extractUserIdFromToken(token);
            const history = await this.ridesService.getDriverHistory(driverUserId);
            
            res.json({ success: true, data: history });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default new RidesController();