"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users-controllers");
const userUseCases_1 = require("../modules/users/userUseCases");
const repositoryClient_1 = require("../database/repositoryClient");
const multerPhoto_1 = require("../middlewares/multerPhoto");
const router = (0, express_1.Router)();
const userUseCase = new userUseCases_1.UserUseCase(repositoryClient_1.prisma);
const userController = new users_controllers_1.UserController(userUseCase);
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
router.post('/users/:id/profile-picture', multerPhoto_1.upload.single('profilePicture'), userController.updateProfilePicture);
exports.default = router;
