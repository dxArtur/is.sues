import Router from "express"
import { Request, Response } from "express"
import controller from '../controllers/users-controllers'


const UserController = new controller()
const router = Router()
router.get('/test', (req: Request, res: Response)=>{
    res.json('test')
})

router.post('/login', (req: Request, res: Response)=>UserController.signin(req, res))

export default router