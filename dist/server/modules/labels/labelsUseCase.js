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
exports.LabelUseCase = void 0;
const repositoryClient_1 = require("../../database/repositoryClient");
const labelSchema_1 = require("../../schamas/labelSchema");
const zod_1 = require("zod");
const CustomError_1 = require("../../Error/CustomError");
class LabelUseCase {
    createLabel(labelData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = labelSchema_1.createLabelSchema.parse(labelData);
                const newLabel = yield repositoryClient_1.prisma.label.create({
                    data: {
                        name: validatedData.name,
                        description: validatedData.description,
                        department: { connect: { id: validatedData.departmentId } }
                    }
                });
                return newLabel;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new CustomError_1.ValidationError("Erro de validação", error);
                }
                throw new CustomError_1.DatabaseError("Erro ao criar o label.");
            }
        });
    }
    getLabelById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = labelSchema_1.labelIdSchema.parse({ id });
                const label = yield repositoryClient_1.prisma.label.findUnique({
                    where: { id: validatedData.id },
                });
                if (!label) {
                    throw new Error("Label não encontrado.");
                }
                return label;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new CustomError_1.ValidationError("Erro de validação", error);
                }
                throw new CustomError_1.DatabaseError("Erro ao buscar o label.");
            }
        });
    }
    updateLabel(labelData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = labelSchema_1.updateLabelSchema.parse(labelData);
                const updatedLabel = yield repositoryClient_1.prisma.label.update({
                    where: { id: validatedData.id },
                    data: Object.assign(Object.assign(Object.assign({}, (validatedData.name && { name: validatedData.name })), (validatedData.description && { description: validatedData.description })), (validatedData.departmentId && { department: { connect: { id: validatedData.departmentId } } }))
                });
                return updatedLabel;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new CustomError_1.ValidationError("Erro de validação", error);
                }
                throw new CustomError_1.DatabaseError("Erro ao atualizar o label.");
            }
        });
    }
    deleteLabel({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = labelSchema_1.labelIdSchema.parse({ id });
                const deletedLabel = yield repositoryClient_1.prisma.label.delete({
                    where: { id: validatedData.id },
                });
                return deletedLabel;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new CustomError_1.ValidationError("Erro de validação", error);
                }
                throw new CustomError_1.DatabaseError("Erro ao deletar o label.");
            }
        });
    }
    listLabels({}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allLabels = yield repositoryClient_1.prisma.label.findMany({});
                return allLabels;
            }
            catch (error) {
                throw new Error("Erro ao buscar labels.");
            }
        });
    }
}
exports.LabelUseCase = LabelUseCase;
