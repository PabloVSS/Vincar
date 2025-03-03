import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class RidesService {
    async getRides(filters) {
        return prisma.ride.findMany({
            where: {
                ...filters,
                status: 'P'
            }
        });
    }

    async createRide(rideData) {
        return prisma.ride.create({
            data: {
                passenger_user_id: rideData.passenger_user_id,
                pickup_address: rideData.pickup_address,
                pickup_latitude: rideData.pickup_latitude,
                pickup_longitude: rideData.pickup_longitude,
                dropoff_address: rideData.dropoff_address,
                pickup_date: new Date(),
            },
        });
    }

    async deleteRide(rideId) {
        return prisma.ride.delete({
            where: {
                id: rideId,
            }
        });
    }

    async finishRide(rideId) {
        return prisma.ride.update({
            where: {
                id: rideId,
            },
            data: {
                status: 'F',
            }
        });
    }

    async getDriverRides(driverUserId) {
        return prisma.ride.findMany({
            where: {
                OR: [
                    {
                        driver_user_id: driverUserId,
                    },
                    {
                        driver_user_id: null,
                        status: 'P'
                    }
                ]
            }
        });
    }

    async getRideById(rideId) {
        return prisma.ride.findUnique({
            where: {
                id: rideId,
            }
        });
    }

    async acceptRide(rideId, driverUserId) {
        return prisma.ride.update({
            where: {
                id: rideId,
            },
            data: {
                driver_user_id: driverUserId,
                status: 'A'
            }
        });
    }

    async cancelRide(rideId) {
        return prisma.ride.update({
            where: {
                id: rideId,
            },
            data: {
                status: 'C' // Ou use um status existente
            }
        });
    }
}

export default RidesService;