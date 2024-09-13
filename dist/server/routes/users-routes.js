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
router.post('/:id/profile-picture', multerPhoto_1.upload.single('profilePicture'), userController.updateProfilePicture);
exports.default = router;
