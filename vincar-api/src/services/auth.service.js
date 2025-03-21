import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const prisma = new PrismaClient();

class AuthService {
    async login(email, password) {
        try {
            console.log('Buscando usuário:', email);

            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                console.log('Usuário não encontrado:', email);
                throw new Error('Credenciais inválidas');
            }

            console.log('Comparando senha para:', email);
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                console.log('Senha incorreta para:', email);
                throw new Error('Credenciais inválidas');
            }

            console.log('Login bem-sucedido para:', email);
            return user;
        } catch (error) {
            console.error('Erro no login:', error);
            throw new Error('Falha na autenticação');
        }
    }

    generateToken(userId) {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error('Chave secreta JWT não configurada');
        }
        
        return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { 
            expiresIn: '1h' 
        });
    }

    async generateResetToken(email) {
        try {
            console.log('Verificando usuário para:', email);
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                console.log('Usuário não encontrado:', email);
                throw new Error('Usuário não encontrado');
            }

            const resetToken = crypto.randomBytes(20).toString('hex');
            const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

            console.log('Atualizando usuário com novo token:', email);
            await prisma.user.update({
                where: { email },
                data: { 
                    resetToken, 
                    resetTokenExpiry 
                },
            });

            console.log('Token gerado com sucesso para:', email);
            return resetToken;
        } catch (error) {
            console.error('Erro ao gerar token de reset:', error);
            throw new Error('Falha ao gerar token de redefinição');
        }
    }

    async validateResetToken(resetToken) {
        try {
            console.log('Validando token:', resetToken);
            const user = await prisma.user.findFirst({
                where: { 
                    resetToken,
                    resetTokenExpiry: { gt: new Date() }
                }
            });

            if (!user) {
                console.log('Token inválido ou expirado:', resetToken);
                return null;
            }

            return user;
        } catch (error) {
            console.error('Erro na validação do token:', error);
            throw new Error('Falha na validação do token');
        }
    }

    async resetPassword(resetToken, newPassword) {
        try {
            console.log('Iniciando reset de senha para token:', resetToken);
            const user = await prisma.$transaction(async (prisma) => {
                const user = await prisma.user.findFirst({
                    where: {
                        resetToken,
                        resetTokenExpiry: { gt: new Date() }
                    }
                });
    
                if (!user) {
                    throw new Error('Token inválido ou expirado');
                }
    
                console.log('Criptografando nova senha para:', user.id);
                const hashedPassword = await bcrypt.hash(newPassword, 10);
    
                console.log('Atualizando senha do usuário:', user.id);
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        password: hashedPassword,
                        resetToken: null,
                        resetTokenExpiry: null
                    }
                });
                return user;
            });
    
            console.log('Senha atualizada com sucesso para:', user.id);
            return true;
        } catch (error) {
            console.error('Erro ao resetar senha:', error);
            throw new Error('Falha ao atualizar a senha');
        }
    }
    
}

export default AuthService;