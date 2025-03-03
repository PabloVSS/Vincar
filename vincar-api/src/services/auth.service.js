import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

class AuthService {
    async login(email, password) {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new Error('Senha incorreta');
        }

        return user;
    }

    generateToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
    }
}

export default AuthService;