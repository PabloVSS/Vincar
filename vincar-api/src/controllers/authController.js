import AuthService from "../services/auth.service.js";

class AuthController {
    constructor() {
        this.authService = new AuthService(); 

        // Vincular métodos
        this.login = this.login.bind(this);
        this.requestPasswordReset = this.requestPasswordReset.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.generateResetToken = this.generateResetToken.bind(this); // Adicione esta linha

    }

    async login(req, res) {
        try {
            if (!req.body || typeof req.body !== 'object') {
                return res.status(400).json({ error: 'Requisição inválida.' });
            }

            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
            }

            console.log('Tentativa de login:', { email });

            const user = await this.authService.login(email, password);
            if (!user) {
                return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
            }

            const token = this.authService.generateToken(user.id);
            console.log('Login bem-sucedido para:', email);

            res.json({ user: { name: user.name, email: user.email }, token });
        } catch (error) {
            console.error('Erro no login:', error);

            const errorMessage = error.message || 'Erro interno do servidor.';
            res.status(500).json({ error: errorMessage });
        }
    }

    async requestPasswordReset(req, res) {
        try {
            const { email } = req.body;
            const resetToken = await this.authService.generateResetToken(email);
            res.json({ resetToken });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async resetPassword(req, res) {
        try {
            const { resetToken } = req.params;
            const { newPassword } = req.body;
            await this.authService.resetPassword(resetToken, newPassword);
            res.json({ message: "Senha redefinida com sucesso!" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async generateResetToken(req, res) {
        try {
            const { email } = req.body;
            const resetToken = await this.authService.generateResetToken(email);
            res.json({ resetToken });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


}

export default new AuthController();