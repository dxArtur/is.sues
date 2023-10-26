import { Router } from 'express'
import userRouter from './users-routes'
import issueRouter from './issues-router'
import seedRoutes from './seed-route-label'
const router = Router()

router.use('/', userRouter)
router.use('/', issueRouter)
router.use('/', seedRoutes)

export default router