import { ridesService } from "../models/rides.module.js";

class RidesController {
    constructor(ridesService) {
        this.ridesService = ridesService;
    }

    async getRides(req, res) {
        try {
            const rides = await this.ridesService.getRides(req.query);
            res.json(rides);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async createRide(req, res) {
        try {
            const ride = await this.ridesService.createRide(req.body);
            res.status(201).json(ride);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async deleteRide(req, res) {
        try {
            const rideId = req.params.id;
            await this.ridesService.deleteRide(rideId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async finishRide(req, res) {
        try {
            const rideId = req.params.id;
            const passengerUserId = req.body.passenger_user_id;
            const updateRide = await this.ridesService.finishRide(rideId, passengerUserId);
            res.json(updateRide);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getDriverRides(req, res) {
        try {
            const driverUserId = req.params.driverUserId;
            const dies = await this.ridesService.getDriverRides(driverUserId);
            res.json(rides);
        } catch (error) {
            res.status(500).json({error : error.message});
        }
    }

    async getRideById(req, res) {
        try {
            const rideId = req.params.id;
            const ride = await this.ridesService.getRideById(rideId);
            if (ride) {
                res.json(ride)
            } else {
                res.status(400).json({message: 'Corrida não encontrada'})
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async acceptRide(req, res) {
        try {
            const rideId = req.params.id;
            const driverUserId = req.body.driver_user_id;
            const updateRide = await this.ridesService.acceptRide(rideId, driverUserId);
            res.json(updateRide);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async cancelRide(req, res) {
        try {
            const rideId = req.params.id;
            const updateRide = await this.ridesService.cancelRide(rideId);
            res.json(updateRide)
        } catch (error) {
            res.status(500).json({ error: error.message})
        }
    }

}

export default RidesController; 