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
exports.IssueUseCase = void 0;
const repositoryClient_1 = require("../../database/repositoryClient");
const issuesSchema_1 = require("../../schamas/issuesSchema");
const zod_1 = require("zod");
const CustomError_1 = require("../../Error/CustomError");
class IssueUseCase {
    createIssue(issueData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = issuesSchema_1.createIssueSchema.parse(issueData);
                const newIssue = yield repositoryClient_1.prisma.issue.create({
                    data: {
                        title: validatedData.title,
                        description: validatedData.description,
                        department: { connect: { id: validatedData.departmentId } },
                        author: { connect: { id: validatedData.authorId } }
                    }
                });
                return newIssue;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new CustomError_1.ValidationError("Erro de validação", error);
                }
                throw new CustomError_1.DatabaseError("Erro ao criar a issue.");
            }
        });
    }
    getIssuesById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = issuesSchema_1.issueIdSchema.parse({ id });
                const issue = yield repositoryClient_1.prisma.issue.findUnique({
                    where: { id: validatedData.id },
                });
                if (!issue) {
                    throw new Error("Issue não encontrada.");
                }
                return issue;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new CustomError_1.ValidationError("Erro de validação", error);
                }
                throw new CustomError_1.DatabaseError("Erro ao buscar a issue.");
            }
        });
    }
    updateIssue(issueData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = issuesSchema_1.updateIssueSchema.parse(issueData);
                const updatedIssue = yield repositoryClient_1.prisma.issue.update({
                    where: { id: validatedData.id },
                    data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (validatedData.title && { title: validatedData.title })), (validatedData.description && { description: validatedData.description })), (validatedData.status && { status: validatedData.status })), (validatedData.departmentId && { department: { connect: { id: validatedData.departmentId } } })), (validatedData.authorId && { author: { connect: { id: validatedData.authorId } } }))
                });
                return updatedIssue;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new CustomError_1.ValidationError("Erro de validação", error);
                }
                throw new CustomError_1.DatabaseError("Erro ao atualizar a issue.");
            }
        });
    }
    deleteIssue({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = issuesSchema_1.issueIdSchema.parse({ id });
                const deletedIssue = yield repositoryClient_1.prisma.issue.delete({
                    where: { id: validatedData.id },
                });
                return deletedIssue;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new CustomError_1.ValidationError("Erro de validação", error);
                }
                throw new Error("Erro ao deletar a issue.");
            }
        });
    }
    listIssues({}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allIssues = yield repositoryClient_1.prisma.issue.findMany();
                return allIssues;
            }
            catch (error) {
                throw new Error("Erro ao buscar issues.");
            }
        });
    }
}
exports.IssueUseCase = IssueUseCase;
