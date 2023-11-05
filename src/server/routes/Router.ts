import { Router } from 'express'
import userRouter from './users-routes'
import issueRouter from './issues-router'
import seedRoutes from './seed-route-label'
import departamentRoutes from './department-routes'


const router = Router()

router.use('/', userRouter)
router.use('/', issueRouter)
router.use('/', seedRoutes)
router.use('/', departamentRoutes)

export default router