import { z } from 'zod';

export const createLabelSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    description: z.string(),
    departmentId: z.string().uuid('ID do departamento inválido'),
});

export const labelIdSchema = z.object({
  id: z.number().int('ID inválido'),
});

export const updateLabelSchema = z.object({
    id: z.number().int('ID inválido'),
    name: z.string().optional(),
    description: z.string().optional(),
    departmentId: z.string().uuid('ID do departamento inválido').optional(),
  });