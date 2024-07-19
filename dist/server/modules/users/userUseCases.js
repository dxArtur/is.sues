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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCase = void 0;
const crypt_1 = __importDefault(require("../../utils/crypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class UserUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    signin({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAttempAuth = yield this.repository.user.findFirstOrThrow({
                where: {
                    email: email,
                },
            });
            if (!userAttempAuth) {
                throw new Error('User not found');
            }
            const matchKeys = yield crypt_1.default.match(password, userAttempAuth.password);
            if (!matchKeys) {
                throw new Error('Senha incorreta');
            }
            const token = (0, jsonwebtoken_1.sign)({
                name: userAttempAuth.name,
                adm: userAttempAuth.adm,
                department: userAttempAuth.departmentId,
            }, process.env.SECRET, {
                expiresIn: '1h',
                algorithm: 'HS256',
                subject: userAttempAuth.id,
            });
            return { token, userAttempAuth };
        });
    }
    signup(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyExistUser = yield this.repository.user.findFirst({
                where: {
                    email: userData.email
                }
            });
            if (verifyExistUser) {
                throw new Error('User already exists');
            }
            const hashedPassword = yield crypt_1.default.cryptPass(userData.password);
            const newUser = yield this.repository.user.create({
                data: {
                    name: userData.name,
                    email: userData.email,
                    password: hashedPassword,
                    departmentId: userData.departmentId,
                    occupation: userData.occupation,
                    adm: userData.adm,
                    photo: userData.photo,
                },
            });
            return newUser;
        });
    }
    listUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield this.repository.user.findMany({});
            if (!allUsers) {
                throw new Error('No have users Registered');
            }
            return allUsers;
        });
    }
    getUserById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        });
    }
    updateUser({ id, name, email, password, departmentId, occupation, adm, photo }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield crypt_1.default.cryptPass(password);
            const updatedUser = yield this.repository.user.update({
                where: {
                    id: id,
                },
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    departmentId,
                    occupation,
                    adm,
                    photo,
                },
            });
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        });
    }
    deleteUser({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.user.findUnique({
                where: { id: id },
            });
            if (!user) {
                throw new Error('User not found');
            }
            if (user.photo) {
                const filePath = path_1.default.join(__dirname, '..', 'uploads', path_1.default.basename(user.photo));
                fs_1.default.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Erro ao excluir a imagem do perfil:", err);
                    }
                });
            }
            const userAttempDeleted = yield this.repository.user.delete({
                where: { id: id }
            });
            return userAttempDeleted;
        });
    }
    updateProfilePicture({ id }, file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file) {
                throw new Error('Nenhum arquivo foi enviado.');
            }
            const filePath = path_1.default.join(__dirname, '..', 'uploads', file.filename);
            const updatedUser = yield this.repository.user.update({
                where: { id: id },
                data: {
                    photo: filePath
                }
            });
            return updatedUser;
        });
    }
}
exports.UserUseCase = UserUseCase;
