import { z } from 'zod';

export const createDepartmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  companyId: z.string().uuid('ID da empresa inválido')
});

export const departmentIdSchema = z.object({
    id: z.string().uuid('ID inválido'),
 });

export const updateDepartmentSchema = z.object({
    id: z.string().uuid('ID inválido'),
    name: z.string().optional(),
    companyId: z.string().uuid('ID da empresa inválido').optional(),
  });