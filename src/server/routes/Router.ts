import { Router } from 'express'
import userRouter from './users-routes'
import issueRouter from './issues-router'
import departamentRoutes from './department-routes'
import companyRoutes from './company-routes'
import labelRoutes from './label-routes';
import authRoutes from './auth-routes'
import { errorHandler } from "../middlewares/errorHandler"

const router = Router()

router.use('/', companyRoutes, errorHandler)
router.use('/users', userRouter);
router.use('/', issueRouter, errorHandler)
router.use('/', departamentRoutes, errorHandler)
router.use('/', labelRoutes, errorHandler)
router.use('/', authRoutes)

// Middleware de tratamento de erros deve ser registrado após as rotas
router.use(errorHandler);

export default router;