"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users-controllers");
const userUseCases_1 = require("../modules/users/userUseCases");
const repositoryClient_1 = require("../database/repositoryClient");
const router = (0, express_1.Router)();
const userUseCase = new userUseCases_1.UserUseCase(repositoryClient_1.prisma);
const userController = new users_controllers_1.UserController(userUseCase);
router.post('/signin', userController.signin);
exports.default = router;
