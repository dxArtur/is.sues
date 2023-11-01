import Router from "express"
import { Request, Response } from "express"
import controller from '../controllers/issues-controller'
import Issue from "../models/issue-interface"

//const issuesController = new controller()
const router = Router()

router.post('/issues/new', controller.addIssue)

router.get('/issues/:id', controller.getIssue)

router.put('/issues/:id', controller.updateIssue)

router.delete('/issues/:id', controller.deleteIssue)

router.get('/issues/all', controller.getAllIssues)


export default router