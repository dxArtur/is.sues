import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload{
    sub:string;
    iat:number;
    exp: number;
    name:string;
  }

export function verifyTokenAuthentication(
    req: Request,
    res: Response,
    next: NextFunction
){
    const header = req.headers.authorization

    if (!header) {
        return res.status(403).json({message: 'token missing'})
    }
    const token = header.split("")[1]

    try {
        const {sub, name} = verify(token, process.env.SECRET) as IPayload
        req.user = {
            id: Number(sub),
            name
        }

        return next()
    } catch (error) {
        return res.status(403).json({message:"token is not valid"})
    }
}