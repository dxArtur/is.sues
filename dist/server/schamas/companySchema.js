"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompanySchema = exports.createCompanySchema = void 0;
const zod_1 = require("zod");
exports.createCompanySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Nome é obrigatório'),
    email: zod_1.z.string().email('Email inválido'),
    password: zod_1.z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    description: zod_1.z.string().optional(),
    latitude: zod_1.z.number().min(-90).max(90).optional(),
    longitude: zod_1.z.number().min(-180).max(180).optional(),
    departments: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.updateCompanySchema = zod_1.z.object({
    id: zod_1.z.string().uuid('ID inválido'),
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email('Email inválido').optional(),
    password: zod_1.z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    description: zod_1.z.string().optional(),
    latitude: zod_1.z.number().min(-90).max(90).optional(),
    longitude: zod_1.z.number().min(-180).max(180).optional(),
    departments: zod_1.z.array(zod_1.z.string()).optional(),
});
