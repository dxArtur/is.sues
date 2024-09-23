import { Request, Response, NextFunction } from 'express';
import { DepartmentUseCase } from '../modules/departments/departmenstUseCase';

export class DepartmentController {

    private caseUse:DepartmentUseCase

    constructor(departmentUseCase:DepartmentUseCase) {
        this.caseUse = departmentUseCase
    }

    createDepartment = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, companyId } = req.body;
            const response = await this.caseUse.createDepartment({ name, companyId })
            return res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }

    getDepartmentById = async(req: Request, res: Response, next: NextFunction) =>{
        try { 
            const { id } = req.params;
            const response = await this.caseUse.getDepartmentsById({ id })
            return res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }

    updateDepartment = async(req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const { name, companyId } = req.body
        try {
            const response = await this.caseUse.updateDepartment({ id, name, companyId });
            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };
    

    deleteDepartment = async(req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            const response = await this.caseUse.deleteDepartment({ id })
            return res.status(200).json(response)
        } catch (error) {
            next(error);
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
    getUsersFromDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { departmentId } = req.params; // Pega o ID do departamento da rota
        const users = await this.caseUse.getUsersFromDepartment(departmentId); // Chama o use case
        return res.status(200).json(users); // Retorna a lista de usuários
    } catch (error) {
        next(error); // Passa o erro para o middleware de erro
    }
    };
}
