import {Request,Response} from 'express'
import Issue from '../models/issue-interface'
import uuidv4 from 'uuidv4'
import shortId from 'shortid'

export default class UserController{
    issues: Issue[] =[]
    
    addIssue(issue: Issue) {

        const idIssue = shortId.generate()

        const {title, description, labelIds} = issue
        const createdAt = new Date()
        


        
        this.issues.push(issue)
    }

    getAllIssues() {
        return this.issues
    }
    
    updateIssue(req: Request, res: Response) {}

    deleteIssue(req: Request, res: Response) {}
    
    viewIssue(req: Request, res: Response) {}
}