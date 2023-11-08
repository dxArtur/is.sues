import { Router } from 'express';
import controller from '../controllers/users-controllers'; 
const router = Router();

// Rota para criar um novo usuário
router.post('/users', controller.createUser);

// Rota para listar todos os usuários
router.get('/users', controller.listUsers);

// Rota para buscar um usuário por ID
router.get('/users/:id', controller.getUserById);

// Rota para atualizar um usuário por ID
router.put('/users/:id', controller.updateUserById);

// Rota para excluir um usuário por ID
router.delete('/users/:id', controller.deleteUserById);

export default router;