import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

class UsersService {

    async getUserById(userId) {
        return prisma.user.findUnique({
          where: { id: userId },
          select: {
            name: true,
            email: true,
          },
        });
      }
    async createUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword
            }
        });
    }

    async getAllUsers() {
        return prisma.user.findMany();
    }

    async getUserByEmail(email) {
        return prisma.user.findUnique({
            where: { email: email },
        });
    }

    async updateUser(userId, userData) {
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        return prisma.user.update({
            where: {
                id: userId,
            },
            data: userData,
        });
    }

    async deleteUser(userId) {
        return prisma.user.delete({
            where: {
                id: userId,
            },
        });
    }

    async getRidesByPassenger(req, res) {
        const { passenger_user_id } = req.params;
        try {
            const rides = await prisma.ride.findMany({
                where: {
                    passenger_user_id: passenger_user_id,
                    status: 'P',
                }
            });
            return res.json(rides);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar corridas' });
        }
    }
}

export default UsersService;