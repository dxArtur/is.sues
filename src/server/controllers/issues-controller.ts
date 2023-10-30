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
    
    updateIssue(issueId: string, updatedIssue: Issue) {

        const issueIndex =this.issues.findIndex(issue=> issueId === issue.id)

        if (issueIndex !== -1) {
           const {title, description, labelIds} = updatedIssue
           this.issues[issueIndex] = {...this.issues[issueIndex]}

           return this.issues[issueIndex]
        } else {
            return null
        }
    }

    deleteIssue(indexIssueToRemove: string) {
        return this.issues.splice(indexIssueToRemove, 1)
    }
    
    viewIssue(req: Request, res: Response) {}
}