import { Router } from 'express';
import userRouter from './users-routes';
import issueRouter from './issues-router';
import departamentRoutes from './department-routes';
import companyRoutes from './company-routes';
import labelRoutes from './label-routes';
import authRoutes from './auth-routes';
import { errorHandler } from '../middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Is.sues API Documentation',
        version: '1.0.0',
        description: 'Documentação da API para gerenciamento de issues',
      },
      servers: [
        {
          url: 'https://is-sues-omega.vercel.app/api',
          description: 'Servidor de Produção'
        },
        {
          url: 'http://localhost:3030/api',
          description: 'Servidor Local'
        }
      ],
    },
    // Ajuste o caminho para os arquivos de anotações Swagger
    //apis: [path.join(__dirname, 'routes/*.js')],
    apis: ['src/server/routes/*.js'],  // Caminho mais direto
  };

const router = Router();

// Rotas da API
router.use('/', companyRoutes, errorHandler);
router.use('/users', userRouter);
router.use('/', issueRouter, errorHandler);
router.use('/', departamentRoutes, errorHandler);
router.use('/', labelRoutes, errorHandler);
router.use('/', authRoutes);

// Configuração do Swagger
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";
const swaggerDocs = swaggerJsdoc(swaggerOptions);
/*router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    customCssUrl: CSS_URL,  // Carregar o CSS via CDN
  }));*/  

  router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, {
      customCss:
        '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
      customCssUrl: CSS_URL,
    }),
  ); 
// Middleware de tratamento de erros deve ser registrado após as rotas
router.use(errorHandler);

export default router;
