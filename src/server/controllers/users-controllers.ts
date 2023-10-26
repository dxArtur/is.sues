import {Request,Response} from 'express'


export default class UserController{
    signin(req: Request, res: Response) {
        const { username, password } = req.body

        if (username === 'daniel13' && password === '000') {
            res.status(200).json({message: 'done'})
        } else {
            res.status(500).json({message: 'denied'})
        }
    }
}