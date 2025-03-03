import express from 'express';
import ridesRoutes from './routes/ridesRoutes.js'; // <-- .js adicionado
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json());

app.use('/rides', ridesRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

export default app;