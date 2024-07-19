"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLabelSchema = exports.labelIdSchema = exports.createLabelSchema = void 0;
const zod_1 = require("zod");
exports.createLabelSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Nome é obrigatório'),
    description: zod_1.z.string(),
    departmentId: zod_1.z.string().uuid('ID do departamento inválido'),
});
exports.labelIdSchema = zod_1.z.object({
    id: zod_1.z.number().int('ID inválido'),
});
exports.updateLabelSchema = zod_1.z.object({
    id: zod_1.z.number().int('ID inválido'),
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    departmentId: zod_1.z.string().uuid('ID do departamento inválido').optional(),
});
