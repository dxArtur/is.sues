import express from 'express';
import routes from './routes/Router';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET!,
  name: 'sessionId',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
}));

// Suas rotas principais
app.use('/api', routes);

// Middleware de tratamento de erros
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api/api-docs`);
});

export default app;
