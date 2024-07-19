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
exports.CompanyUseCase = void 0;
const repositoryClient_1 = require("../../database/repositoryClient");
const crypt_1 = __importDefault(require("../../utils/crypt"));
const companySchema_1 = require("../../schamas/companySchema");
const zod_1 = require("zod");
const CustomError_1 = require("../../Error/CustomError");
class CompanyUseCase {
    createCompany(companyData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = companySchema_1.createCompanySchema.parse(companyData);
                const hashedPassword = yield crypt_1.default.cryptPass(validatedData.password);
                const newCompany = yield repositoryClient_1.prisma.company.create({
                    data: {
                        name: validatedData.name,
                        email: validatedData.email,
                        password: hashedPassword,
                        latitude: validatedData.latitude,
                        longitude: validatedData.longitude,
                        description: validatedData.description,
                    }
                });
                return newCompany;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new CustomError_1.ValidationError("Erro de validação", error);
                }
                throw new CustomError_1.DatabaseError("Erro ao criar a empresa.");
            }
        });
    }
    getCompanyById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const company = yield repositoryClient_1.prisma.company.findUnique({
                    where: { id },
                });
                return company;
            }
            catch (error) {
                console.error("Erro ao buscar a empresa:", error);
                throw new Error("Erro ao buscar a empresa.");
            }
        });
    }
    updateCompany(updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Valida os dados de entrada
                const validatedData = companySchema_1.updateCompanySchema.parse(updateData);
                let hashedPassword;
                if (validatedData.password) {
                    hashedPassword = yield crypt_1.default.cryptPass(validatedData.password);
                }
                const updatedCompany = yield repositoryClient_1.prisma.company.update({
                    where: { id: validatedData.id },
                    data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (validatedData.name && { name: validatedData.name })), (validatedData.email && { email: validatedData.email })), (hashedPassword && { password: hashedPassword })), (validatedData.description && { description: validatedData.description })), (validatedData.departments && { departments: { connect: validatedData.departments.map(depId => ({ id: depId })) } })), (validatedData.latitude != null && { latitude: validatedData.latitude })), (validatedData.longitude != null && { longitude: validatedData.longitude })),
                });
                return updatedCompany;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new CustomError_1.ValidationError("Erro de validação", error);
                }
                throw new CustomError_1.DatabaseError("Erro ao atualizar a empresa.");
            }
        });
    }
    deleteCompany({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(id);
                const deletedCompany = yield repositoryClient_1.prisma.company.delete({
                    where: {
                        id: id
                    }
                });
                return deletedCompany;
            }
            catch (error) {
                throw new Error("Erro ao deletar a empresa.");
            }
        });
    }
    listCompanies({}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allCompanies = yield repositoryClient_1.prisma.company.findMany();
                return allCompanies;
            }
            catch (error) {
                throw new Error("Erro ao buscar empresas.");
            }
        });
    }
    deleteAllCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteAllCompanies = yield repositoryClient_1.prisma.company.deleteMany();
                return deleteAllCompanies;
            }
            catch (error) {
                throw new Error("Erro ao deletar empresas.");
            }
        });
    }
}
exports.CompanyUseCase = CompanyUseCase;
