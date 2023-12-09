import {Request,Response} from 'express'
import { IssueUseCase } from '../modules/issues/issueUseCase'
import { createIssueSchema, issueIdSchema, updateIssueSchema } from '../schamas/issuesSchema';
import { ZodError } from 'zod';

export class IssuesController {

    private useCase:IssueUseCase

    constructor(issueUseCase: IssueUseCase) {
        this.useCase = issueUseCase
    }

    createIssue = async(req: Request, res: Response) =>{
        try {
            const validatedData = createIssueSchema.parse(req.body);
            const response = await this.useCase.createIssue(validatedData);
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

    getIssueById = async(req: Request, res: Response) =>{
        try {
            const validatedParams = issueIdSchema.parse(req.params);
            const response = await this.useCase.getIssuesById(validatedParams);
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
    
    updateIssue = async(req: Request, res: Response) => {
        try {
            const validatedData = updateIssueSchema.parse({ ...req.params, ...req.body });
            const response = await this.useCase.updateIssue(validatedData);
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

    deleteIssue = async(req: Request, res: Response) => {
        try {
            const validatedParams = issueIdSchema.parse(req.params);
            const response = await this.useCase.deleteIssue(validatedParams);
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

    getAllIssues = async(req: Request, res:Response) => {
        const response = await this.useCase.listIssues({})
        return res.status(200).json(response)
    }
}