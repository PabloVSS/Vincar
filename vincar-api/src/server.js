import dotenv from 'dotenv';
import app from './app.js'; // <-- .js adicionado
dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3001}`);

app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));