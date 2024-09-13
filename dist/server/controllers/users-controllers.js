"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userSchema_1 = require("../schamas/userSchema");
const zod_1 = require("zod");
class UserController {
    constructor(userUseCase) {
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = userSchema_1.signUpSchema.parse(req.body);
                const response = yield this.caseUse.signup(userData);
                return res.status(200).json(response);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    return res.status(400).json({
                        error: "Dados de entrada inválidos",
                        validationErrors: error.errors.map(e => ({
                            path: e.path.join('.'),
                            message: e.message
                        }))
                    });
                }
                console.log(error);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
        this.listUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.caseUse.listUsers();
            return res.status(200).json(response);
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                userSchema_1.idUserSchema.parse(id); // Valide o ID usando o esquema Zod
                const response = yield this.caseUse.getUserById({ id });
                return res.status(200).json(response);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    return res.status(400).json({
                        error: "Dados de entrada inválidos",
                        validationErrors: error.errors.map(e => ({
                            path: e.path.join('.'),
                            message: e.message
                        }))
                    });
                }
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
        this.updateUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, departmentId, occupation, adm, photo } = req.body;
                const id = req.params.id;
                userSchema_1.updateUserSchema.parse({
                    name,
                    email,
                    password,
                    departmentId,
                    occupation,
                    adm,
                    photo,
                });
                const response = yield this.caseUse.updateUser({ id, name, email, password, departmentId, occupation, adm, photo });
                return res.status(200).json(response);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    return res.status(400).json({
                        error: "Dados de entrada inválidos",
                        validationErrors: error.errors.map(e => ({
                            path: e.path.join('.'),
                            message: e.message
                        }))
                    });
                }
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
        this.deleteUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                userSchema_1.idUserSchema.parse(id);
                const response = yield this.caseUse.deleteUser({ id });
                return res.status(200).json(response);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    return res.status(400).json({
                        error: "Dados de entrada inválidos",
                        validationErrors: error.errors.map(e => ({
                            path: e.path.join('.'),
                            message: e.message
                        }))
                    });
                }
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
        this.signin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = userSchema_1.signinSchema.parse(req.body);
                const response = yield this.caseUse.signin({ email, password });
                return res.status(200).json(response);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    return res.status(400).json({
                        error: "Dados de entrada inválidos",
                        validationErrors: error.errors.map(e => ({
                            path: e.path.join('.'),
                            message: e.message
                        }))
                    });
                }
                console.log(error);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
        this.updateProfilePicture = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const file = req.file;
                if (!file) {
                    return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
                }
                const updatedUser = yield this.caseUse.updateProfilePicture({ id }, file);
                return res.status(200).json({
                    message: 'Imagem do perfil atualizada com sucesso.',
                    user: updatedUser
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Erro detectado:", error.message);
                    return res.status(500).json({ error: error.message });
                }
                else {
                    console.error("Erro desconhecido:", error);
                    return res.status(500).json({ error: "Erro interno do servidor" });
                }
            }
        });
        this.caseUse = userUseCase;
    }
}
exports.UserController = UserController;
