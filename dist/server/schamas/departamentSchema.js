"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDepartmentSchema = exports.departmentIdSchema = exports.createDepartmentSchema = void 0;
const zod_1 = require("zod");
exports.createDepartmentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Nome é obrigatório'),
    companyId: zod_1.z.string().uuid('ID da empresa inválido')
});
exports.departmentIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('ID inválido'),
});
exports.updateDepartmentSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('ID inválido'),
    name: zod_1.z.string().optional(),
    companyId: zod_1.z.string().uuid('ID da empresa inválido').optional(),
});
