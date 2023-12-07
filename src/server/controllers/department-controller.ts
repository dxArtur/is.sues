import { Request, Response } from 'express';
import { DepartmentUseCase } from '../modules/departments/departmenstUseCase';
import { createDepartmentSchema, departmentIdSchema, updateDepartmentSchema } from '../schamas/departamentSchema';
import { ZodError } from 'zod';

export class DepartmentController {

    private caseUse:DepartmentUseCase

    constructor(departmentUseCase:DepartmentUseCase) {
        this.caseUse = departmentUseCase
    }

    createDepartment = async(req: Request, res: Response) => {
        try {
            const validatedData = createDepartmentSchema.parse(req.body);
            const response = await this.caseUse.createDepartment(validatedData);
            return res.status(200).json(response);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ 
                    success: false, 
                    error: "Dados de entrada inválidos", 
                    validationErrors: error.errors.map(e => ({
                        path: e.path.join('.'),
                        message: e.message
                    }))
                });
            }
            return res.status(500).json({ success: false, error: "Erro interno do servidor" });
        }
    }

    getDepartmentById = async(req: Request, res: Response) =>{
        try {
            const validatedParams = departmentIdSchema.parse(req.params);
            const response = await this.caseUse.getDepartmentsById(validatedParams);
            return res.status(200).json(response);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ 
                    success: false, 
                    error: "Dados de entrada inválidos", 
                    validationErrors: error.errors.map(e => ({
                        path: e.path.join('.'),
                        message: e.message
                    }))
                });
            }
            return res.status(500).json({ success: false, error: "Erro interno do servidor" });
        }
    }

    updateDepartment = async(req: Request, res: Response) =>{
        try {
            const validatedData = updateDepartmentSchema.parse({ ...req.params, ...req.body });
            const response = await this.caseUse.updateDepartment(validatedData);
            return res.status(200).json(response);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ 
                    success: false, 
                    error: "Dados de entrada inválidos", 
                    validationErrors: error.errors.map(e => ({
                        path: e.path.join('.'),
                        message: e.message
                    }))
                });
            }
            return res.status(500).json({ success: false, error: "Erro interno do servidor" });
        }
    }

    deleteDepartment = async(req: Request, res: Response) => {
        try {
            const validatedParams = departmentIdSchema.parse(req.params);
            const response = await this.caseUse.deleteDepartment(validatedParams);
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

    getAllDepartments = async(req: Request, res: Response) => {
        try {
            const response = await this.caseUse.listDepartments();
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}
