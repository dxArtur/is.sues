import { Router } from 'express'
import userRouter from './users-routes'
import issueRouter from './issues-router'
import seedRoutes from './seed-route-label'
import departamentRoutes from './department-routes'
import companyRoutes from './company-routes'
import labelRoutes from './label-routes';

const router = Router()

router.use('/', companyRoutes)
router.use('/', userRouter)
router.use('/', issueRouter)
router.use('/', seedRoutes)
router.use('/', departamentRoutes)
router.use('/', labelRoutes)

export default router