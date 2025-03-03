import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

class UsersService {

    async createUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword
            }
        })
    }

    async getAllUsers() { 
        return prisma.user.findMany();
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
}

export default UsersService;