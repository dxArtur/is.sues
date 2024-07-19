"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = exports.updateUserSchema = exports.idUserSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    occupation: zod_1.z.string(),
    adm: zod_1.z.boolean(),
    photo: zod_1.z.string().optional(),
    departmentId: zod_1.z.string().optional(),
});
exports.idUserSchema = zod_1.z.string().uuid();
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(6).optional(),
    departmentId: zod_1.z.string().optional(),
    occupation: zod_1.z.string().optional(),
    adm: zod_1.z.boolean().optional(),
    photo: zod_1.z.string().optional(),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
