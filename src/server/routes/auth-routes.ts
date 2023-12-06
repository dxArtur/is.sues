import { Router } from 'express'
import { UserController } from '../controllers/users-controllers'; 
import { UserUseCase } from '../modules/users/userUseCases'
import { prisma } from '../database/repositoryClient';

const router = Router()
const userUseCase = new UserUseCase(prisma)
const userController = new UserController(userUseCase)


router.post('/signin', userController.signin)


export default router;