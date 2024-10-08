"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_routes_1 = __importDefault(require("./users-routes"));
const issues_router_1 = __importDefault(require("./issues-router"));
const department_routes_1 = __importDefault(require("./department-routes"));
const company_routes_1 = __importDefault(require("./company-routes"));
const label_routes_1 = __importDefault(require("./label-routes"));
const auth_routes_1 = __importDefault(require("./auth-routes"));
const errorHandler_1 = require("../middlewares/errorHandler");
const router = (0, express_1.Router)();
router.use('/', company_routes_1.default, errorHandler_1.errorHandler);
router.use('/users', users_routes_1.default);
router.use('/', issues_router_1.default, errorHandler_1.errorHandler);
router.use('/', department_routes_1.default, errorHandler_1.errorHandler);
router.use('/', label_routes_1.default, errorHandler_1.errorHandler);
router.use('/', auth_routes_1.default);
// Middleware de tratamento de erros deve ser registrado ap�s as rotas
router.use(errorHandler_1.errorHandler);
exports.default = router;
