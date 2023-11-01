import Router from "express"
import { Request, Response } from "express"
import controller from '../controllers/issues-controller'
import Issue from "../models/issue-interface"

//const issuesController = new controller()
const router = Router()

router.post('/issues/new', controller.addIssue)

export default router