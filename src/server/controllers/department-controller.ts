import { Request, Response } from 'express';
import { DepartmentUseCase } from '../modules/departments/departmenstUseCase';

export class DepartmentController {

    private caseUse:DepartmentUseCase

    constructor(departmentUseCase:DepartmentUseCase) {
        this.caseUse = departmentUseCase
    }

    createDepartment = async(req: Request, res: Response) => {
        const { name, companyId } = req.body;
        const response = await this.caseUse.createDepartment({ name, companyId })
        return res.status(200).json(response)
    }

    getDepartmentById = async(req: Request, res: Response) =>{
        const { id } = req.params;
        const response = await this.caseUse.getDepartmentsById({ id })
        return res.status(200).json(response)
    }

    updateDepartment = async(req: Request, res: Response) =>{
        const { id } = req.params
        const { name, companyId } = req.body
        const response = await this.caseUse.updateDepartment({ id, name, companyId })
        return res.status(200).json(response)
    }

    deleteDepartment = async(req: Request, res: Response) => {
        const { id } = req.params
        const response = await this.caseUse.deleteDepartment({ id })
        return res.status(200).json(response)
    }

    getAllDepartments = async(req: Request, res: Response) => {
        const response = await this.caseUse.listDepartments()
        return res.status(200).json(response)
    }
}
