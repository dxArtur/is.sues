import { z } from 'zod';

export const createIssueSchema = z.object({
    title: z.string().min(1, 'Título é obrigatório'),
    description: z.string().min(1, 'Descrição é obrigatória'),
    departmentId: z.string().uuid('ID do departamento inválido'),
    authorId: z.string().uuid('ID do autor inválido'),
  });

  export const issueIdSchema = z.object({
    id: z.string().uuid('ID inválido'),
  });

  export const updateIssueSchema = z.object({
    id: z.string().uuid('ID inválido'),
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.boolean().optional(),
    departmentId: z.string().uuid().optional(),
    authorId: z.string().uuid().optional(),
  });