import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  description: z.string().optional(),
  departments: z.array(z.string()).optional(),
});

export const updateCompanySchema = z.object({
  id: z.string().uuid('ID inválido'),
  name: z.string().optional(),
  email: z.string().email('Email inválido').optional(),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  description: z.string().optional(),
  departments: z.array(z.string()).optional(),
});

