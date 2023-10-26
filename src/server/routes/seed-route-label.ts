import Router from "express"
import { Request, Response } from "express"
import controller from '../seeders/labels-seeders'
import Issue from "../models/issue-interface"

//const labelController = new controller()
const router = Router()

router.get('/api/labels', (req: Request, res: Response)=>{
    const labels = controller.getAllLabels()
    res.json(labels)
})

export default router