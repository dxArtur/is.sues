import { Router } from 'express'
import controller from '../controllers/users-controllers'
const router = Router()

router.post('/signin', controller.signin);


export default router;