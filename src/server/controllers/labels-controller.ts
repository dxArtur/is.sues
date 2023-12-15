import { Request, Response } from 'express';
import { LabelUseCase } from '../modules/labels/labelsUseCase'
import { createLabelSchema, labelIdSchema, updateLabelSchema } from '../schamas/labelSchema';
import { ZodError } from 'zod';

export class LabelController {
  private useCase: LabelUseCase

  constructor (labelUseCase: LabelUseCase) {
    this.useCase = labelUseCase
  }

  createLabel = async(req: Request, res: Response) =>{
    try {
        const validatedData = createLabelSchema.parse(req.body);
        const response = await this.useCase.createLabel(validatedData);
        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ 
                error: "Dados de entrada inválidos", 
                validationErrors: error.errors.map(e => ({
                    path: e.path.join('.'),
                    message: e.message
                }))
            });
        }
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  getLabelById = async (req: Request, res: Response) => {
    try {
        const validatedParams = labelIdSchema.parse(req.params);
        const response = await this.useCase.getLabelById(validatedParams);
        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ 
                error: "Dados de entrada inválidos", 
                validationErrors: error.errors.map(e => ({
                    path: e.path.join('.'),
                    message: e.message
                }))
            });
        }
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  updateLabel = async (req: Request, res: Response) => {
    try {
        const params = {
            ...req.body,
            id: parseInt(req.params.id)
        };
        const validatedParams = updateLabelSchema.parse(params);
        const response = await this.useCase.updateLabel(validatedParams);
        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ 
                error: "Dados de entrada inválidos", 
                validationErrors: error.errors.map(e => ({
                    path: e.path.join('.'),
                    message: e.message
                }))
            });
        }
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  deletedLabel = async (req: Request, res: Response) => {
    try {
        const params = { id: parseInt(req.params.id) };
        const validatedParams = labelIdSchema.parse(params);
        const response = await this.useCase.deleteLabel(validatedParams);
        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ 
                error: "Dados de entrada inválidos", 
                validationErrors: error.errors.map(e => ({
                    path: e.path.join('.'),
                    message: e.message
                }))
            });
        }
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  listLabels = async (req: Request, res: Response) => {
    const response = await this.useCase.listLabels({})
    return res.status(200).json(response)
  }
}
