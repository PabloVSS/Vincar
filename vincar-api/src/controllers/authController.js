
import { authService } from "../models/auth.module.js";


class AuthController {
    constructor(authService) {
      this.authService = authService;
    }
  
    login = async (req, res) => { // Use arrow function para manter o contexto
      try {
        const { email, password } = req.body;
        const user = await this.authService.login(email, password);
        const token = this.authService.generateToken(user.id);
        res.json({ user, token });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
  
  export default AuthController;