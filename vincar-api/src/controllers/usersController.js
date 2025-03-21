import UsersService from '../services/users.service.js';
import Joi from "joi";

class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }

    validateUser(data) {
        const schema = Joi.object({
            name: Joi.string().min(3).max(50).required().messages({
                "string.empty": "O nome é obrigatório.",
                "string.min": "O nome deve ter pelo menos 3 caracteres.",
                "string.max": "O nome deve ter no máximo 50 caracteres."
            }),
            email: Joi.string().email().required().messages({
                "string.email": "O email deve ser válido.",
                "string.empty": "O email é obrigatório."
            }),
            phone: Joi.string().pattern(/^(\d{2})?\d{8,9}$/).required().messages({
                "string.pattern.base": "O telefone deve conter 8 ou 9 dígitos numéricos, com ou sem DDD.",
                "string.empty": "O telefone é obrigatório."
            }),
            password: Joi.string().min(6).max(20).required().messages({
                "string.empty": "A senha é obrigatória.",
                "string.min": "A senha deve ter pelo menos 6 caracteres.",
                "string.max": "A senha deve ter no máximo 20 caracteres."
            })
        });

        return schema.validate(data, { abortEarly: false });
    }

    async getUserProfile(req, res) {
        try {
            console.log("req.userId:", req.userId); // Log para depuração
            const userId = req.userId;
            const user = await this.usersService.getUserById(userId);

            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }

            return res.json(user);
        } catch (error) {
            console.error("Erro ao buscar perfil:", error);
            return res.status(500).json({ error: "Erro ao buscar perfil" });
        }
    }

    async createUser(req, res, next) {
        try {
            const { email } = req.body;

            const existingUser = await this.usersService.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'Este email já está em uso.' });
            }

            const { error } = this.validateUser(req.body);
            if (error) {
                return res.status(400).json({ errors: error.details.map(err => err.message) });
            }

            const user = await this.usersService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            console.error("Erro ao criar usuário:", error); // Log para depuração
            next(error);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await this.usersService.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error("Erro ao buscar todos os usuários:", error); // Log para depuração
            next(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "ID do usuário é obrigatório." });
            }

            const updatedUser = await this.usersService.updateUser(id, req.body);
            if (!updatedUser) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            res.json(updatedUser);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error); // Log para depuração
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "ID do usuário é obrigatório." });
            }

            const deleted = await this.usersService.deleteUser(id);
            if (!deleted) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            res.status(204).send();
        } catch (error) {
            console.error("Erro ao deletar usuário:", error); // Log para depuração
            next(error);
        }
    }
}

export default UsersController;