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
exports.DepartmentUseCase = void 0;
const repositoryClient_1 = require("../../database/repositoryClient");
const departamentSchema_1 = require("../../schamas/departamentSchema");
const zod_1 = require("zod");
const CustomError_1 = require("../../Error/CustomError");
class DepartmentUseCase {
    createDepartment({ name, companyId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = departamentSchema_1.createDepartmentSchema.parse({ name, companyId });
                const newDepartment = yield repositoryClient_1.prisma.department.create({
                    data: {
                        name: validatedData.name,
                        company: {
                            connect: { id: validatedData.companyId }
                        }
                    }
                });
                return newDepartment;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new CustomError_1.ValidationError("Erro de validação", error);
                }
                throw new CustomError_1.DatabaseError("Erro ao criar a departamento.");
            }
        });
    }
    getDepartmentsById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = departamentSchema_1.departmentIdSchema.parse({ id });
                const department = yield repositoryClient_1.prisma.department.findUnique({
                    where: { id: validatedData.id },
                });
                if (!department) {
                    throw new Error("Departamento não encontrado");
                }
                return department;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new CustomError_1.ValidationError("Erro de validação", error);
                }
                throw new CustomError_1.DatabaseError("Erro ao buscars o departamento.");
            }
        });
    }
    updateDepartment(updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = departamentSchema_1.updateDepartmentSchema.parse(updateData);
                const updatedDepartment = yield repositoryClient_1.prisma.department.update({
                    where: { id: validatedData.id },
                    data: {
                        name: validatedData.name,
                        companyId: validatedData.companyId
                    }
                });
                return updatedDepartment;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new CustomError_1.ValidationError("Erro de validação", error);
                }
                throw new CustomError_1.DatabaseError("Erro ao atualizar o departamento.");
            }
        });
    }
    deleteDepartment({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = departamentSchema_1.departmentIdSchema.parse({ id });
                const deletedDepartment = yield repositoryClient_1.prisma.department.delete({
                    where: { id: validatedData.id },
                });
                return deletedDepartment;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new CustomError_1.ValidationError("Erro de validação", error);
                }
                throw new CustomError_1.DatabaseError("Erro ao deletar o departamento.");
            }
        });
    }
    listDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allDepartments = yield repositoryClient_1.prisma.department.findMany({});
                return allDepartments;
            }
            catch (error) {
                throw new Error("Erro ao listar departamentos.");
            }
        });
    }
}
exports.DepartmentUseCase = DepartmentUseCase;
