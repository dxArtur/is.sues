"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIssueSchema = exports.issueIdSchema = exports.createIssueSchema = void 0;
const zod_1 = require("zod");
exports.createIssueSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Título é obrigatório'),
    description: zod_1.z.string().min(1, 'Descrição é obrigatória'),
    departmentId: zod_1.z.string().uuid('ID do departamento inválido'),
    authorId: zod_1.z.string().uuid('ID do autor inválido'),
});
exports.issueIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('ID inválido'),
});
exports.updateIssueSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('ID inválido'),
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.boolean().optional(),
    departmentId: zod_1.z.string().uuid().optional(),
    authorId: zod_1.z.string().uuid().optional(),
});
