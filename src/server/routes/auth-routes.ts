import { Router } from 'express'
import { UserController } from '../controllers/users-controllers'; 
import { UserUseCase } from '../modules/users/userUseCases'
import { prisma } from '../database/repositoryClient';

const router = Router()
const userUseCase = new UserUseCase(prisma)
const userController = new UserController(userUseCase)

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *             example:
 *               email: usuario@example.com
 *               password: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticação JWT
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/signin', userController.signin)

export default router;
