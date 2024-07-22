import { Router } from 'express';
import { UserController } from '../controllers/users-controllers'; 
import { UserUseCase } from '../modules/users/userUseCases';
import { prisma } from '../database/repositoryClient';
import { upload } from '../middlewares/multerPhoto';

const router = Router();
const userUseCase = new UserUseCase(prisma);
const userController = new UserController(userUseCase);

// Rota para criar um novo usu�rio
router.post('/', userController.signup);

// Rota para listar todos os usu�rios
router.get('/', userController.listUsers);

// Rota para buscar um usu�rio por ID
router.get('/:id', userController.getUserById);

// Rota para atualizar um usu�rio por ID
router.put('/:id', userController.updateUserById);

// Rota para excluir um usu�rio por ID
router.delete('/:id', userController.deleteUserById);

// Rota para adicionar foto ao perfil do usu�rio por ID
router.post('/:id/profile-picture', upload.single('profilePicture'), userController.updateProfilePicture);

export default router;
