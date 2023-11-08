import { Router } from 'express';
import { createUser, listUsers, getUserById, updateUserById, deleteUserById } from '../controllers/users-controllers'; 
const router = Router();

// Rota para criar um novo usuário
router.post('/users', createUser);

// Rota para listar todos os usuários
router.get('/users', listUsers);

// Rota para buscar um usuário por ID
router.get('/users/:id', getUserById);

// Rota para atualizar um usuário por ID
router.put('/users/:id', updateUserById);

// Rota para excluir um usuário por ID
router.delete('/users/:id', deleteUserById);

export default router;