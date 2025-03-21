import { useEffect, useState } from 'react';
import { api } from '@/constants/api';
import { AxiosError } from 'axios';

const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [generatedToken, setGeneratedToken] = useState<string | null>(null);
    useEffect(() => {
        if (success) {
            console.log('Reset de senha bem-sucedido. Estado success:', success);
        }
    }, [success]);


    const generateResetToken = async (email: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        setGeneratedToken(null);

        try {
            const response = await api.post('/auth/generate-reset-token', { email });
            setGeneratedToken(response.data.resetToken); // Garantir que está usando a chave correta
            setSuccess(true);
            return response.data.resetToken;
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data?.error || err.message || 'Erro ao gerar token de reset.');
            } else {
                setError('Erro ao gerar token de reset.');
            }
            console.error('Erro ao gerar token de reset:', err);
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (resetToken: string, newPassword: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.post(`/auth/reset-password/${resetToken}`, { newPassword });
            setSuccess(true);
            console.log('Estado success:', success); // Adicione este log

        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data?.error || err.message || 'Erro ao resetar senha.');
            } else {
                setError('Erro ao resetar senha.');
            }
            console.error('Erro ao resetar senha:', err);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        success,
        generateResetToken,
        resetPassword,
        generatedToken,
    };
};

export default useResetPassword;