import Router from "express"
import { Request, Response } from "express"
import controller from '../controllers/issues-controller'
import Issue from "../models/issue-interface"

const issuesController = new controller()
const router = Router()

router.post('/new', (req: Request, res: Response)=>{
    const issueData: Issue = req.body
    issuesController.addIssue(issueData)
    
    res.status(201).send('issue add')
})

export default router