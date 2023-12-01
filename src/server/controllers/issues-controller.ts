import {Request,Response} from 'express'
import { IssueUseCase } from '../modules/issues/issueUseCase'

export class IssuesController {

    private useCase:IssueUseCase

    constructor(issueUseCase: IssueUseCase) {
        this.useCase = issueUseCase
    }

    createIssue = async(req: Request, res: Response) =>{
        const {title, description, departmentId, labelsId, authorId} = req.body
        const response = await this.useCase.createIssue({title, description, departmentId, labelsId, authorId})
        return res.status(200).json(response)
    }

    getIssueById = async(req: Request, res: Response) =>{
        const { id } = req.params;
        const response = await this.useCase.getIssuesById({ id })
        return res.status(200).json(response)
    }
    
    updateIssue = async(req: Request, res: Response) => {
        const { id } = req.params
        const response = await this.useCase.updateIssue({ id, title, description, departmentId, labelsId, authorId})
        return res.status(200).json(response)
    }

    deleteIssue =  async(req: Request, res: Response) => {
        const { id } = req.params
        const response = await this.useCase.deleteIssue({ id })
        return res.status(200).json(response)
    }

    getAllIssues = async(req: Request, res:Response) => {
        const response = await this.useCase.listIssues({ })
        return res.status(200).json(response)
    }
}