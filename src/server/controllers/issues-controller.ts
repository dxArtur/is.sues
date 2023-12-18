import {Request,Response, NextFunction} from 'express'
import { IssueUseCase } from '../modules/issues/issueUseCase'

export class IssuesController {

    private useCase:IssueUseCase

    constructor(issueUseCase: IssueUseCase) {
        this.useCase = issueUseCase
    }

    createIssue = async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const {title, description, departmentId, authorId} = req.body
            const response = await this.useCase.createIssue({title, description, departmentId, authorId})
            return res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }

    getIssueById = async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const { id } = req.params;
            const response = await this.useCase.getIssuesById({ id })
            return res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }
    
    updateIssue = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const {title, description, status, departmentId, authorId} = req.body
            const response = await this.useCase.updateIssue({ id, title, description,status, departmentId, authorId})
            return res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }

    deleteIssue =  async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const response = await this.useCase.deleteIssue({ id })
            return res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }

    getAllIssues = async(req: Request, res:Response) => {
        const response = await this.useCase.listIssues({})
        return res.status(200).json(response)
    }
}