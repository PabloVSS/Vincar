import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class RidesService {
  async getRides(filters) {
    return prisma.ride.findMany({
      where: { ...filters },
      include: {
        passenger: {
          select: { name: true, phone: true }
        }
      }
    });
  }

  async getRidesPedents(filters) {
    return prisma.ride.findMany({
      where: { ...filters, status: 'P' },
      include: {
        passenger: {
          select: { name: true }
        }
      }
    });
  }

  async getRidesByPassenger(passengerUserId) {
    return prisma.ride.findMany({
      where: { passenger_user_id: passengerUserId },
      include: {
        passenger: { select: { name: true, phone: true } },
        driver: { select: { name: true, phone: true } }
      }
    });
  }

  async createRide(rideData) {
    if (!rideData.passenger_user_id) {
      throw new Error("O ID do passageiro é obrigatório");
    }

    return prisma.ride.create({
      data: {
        passenger_user_id: rideData.passenger_user_id,
        pickup_address: rideData.pickup_address,
        pickup_latitude: rideData.pickup_latitude,
        pickup_longitude: rideData.pickup_longitude,
        dropoff_address: rideData.dropoff_address,
        pickup_date: new Date()
      }
    });
  }

  async deleteRide(rideId) {
    return prisma.ride.delete({
      where: { id: rideId }
    });
  }

  async getDriverRides(driverUserId) {
    try {
      const rides = await prisma.ride.findMany({
        where: {
          OR: [
            { driver_user_id: driverUserId },
            { driver_user_id: null, status: 'P' }
          ]
        },
        include: {
          passenger: { select: { name: true, phone: true } },
          driver: { select: { name: true, phone: true } }
        }
      });

      return rides;
    } catch (error) {
      throw error;
    }
  }

  async getRideById(rideId) {
    return prisma.ride.findUnique({
      where: { id: rideId },
      include: {
        passenger: { select: { name: true, phone: true } },
        driver: { select: { name: true, phone: true } }
      }
    });
  }

  async acceptRide(rideId, driverUserId) {
    return prisma.ride.update({
      where: { id: rideId },
      data: {
        driver_user_id: driverUserId,
        status: 'A'
      }
    });
  }

  async cancelRide(rideId) {
    return prisma.ride.update({
      where: { id: rideId },
      data: { status: 'C' }
    });
  }

  async finishRide(rideId) {
    return prisma.ride.update({
      where: { id: rideId },
      data: { status: 'F' }
    });
  }

  async getPassengerHistory(passengerUserId) {
    return prisma.ride.findMany({
      where: { passenger_user_id: passengerUserId },
      orderBy: { pickup_date: 'desc' },
      include: { driver: { select: { name: true, phone: true } } }
    });
  }

  async getDriverHistory(driverUserId) {
    return prisma.ride.findMany({
      where: { driver_user_id: driverUserId },
      orderBy: { pickup_date: 'desc' },
      include: { passenger: { select: { name: true, phone: true } } }
    });
  }
  
  async getPassengerPendingRides(passengerUserId) {
    try {
      const rides = await prisma.ride.findMany({
        where: { passenger_user_id: passengerUserId },
        include: {
          passenger: { select: { name: true, phone: true } },
          driver: { select: { name: true, phone: true } }
        }
      });

      const pendingRides = rides.filter(ride => ride.status === 'P');

      return pendingRides;
    } catch (error) {
      throw new Error('Erro ao buscar corridas pendentes do passageiro: ' + error.message);
    }
  }
}

export default new RidesService();
