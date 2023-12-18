import { Router } from 'express';
import { UserController } from '../controllers/users-controllers'; 
import { UserUseCase } from '../modules/users/userUseCases';
import { prisma } from '../database/repositoryClient';
import { upload } from '../middlewares/multerPhoto';

const router = Router()
const userUseCase = new UserUseCase(prisma)
const userController = new UserController(userUseCase)

// Rota para criar um novo usuário
router.post('/users', userController.signup);

// Rota para listar todos os usuários
router.get('/users', userController.listUsers);

// Rota para buscar um usuário por ID
router.get('/users/:id', userController.getUserById);

// Rota para atualizar um usuário por ID
router.put('/users/:id', userController.updateUserById);

// Rota para excluir um usuário por ID
router.delete('/users/:id', userController.deleteUserById);

//Rota para adicionar foto ao perfil do usuário por ID
router.post('/users/:id/profile-picture', upload.single('profilePicture'), userController.updateProfilePicture);

export default router;

