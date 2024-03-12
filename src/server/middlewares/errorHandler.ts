import { Request, Response, NextFunction } from 'express';
import { ValidationError, DatabaseError } from '../Error/CustomError';

export const errorHandler = (
    error: Error | ValidationError, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if (error instanceof ValidationError) {
        const validationErrors = error.details.errors.map(e => {
            return {
                field: e.path.join('.'),
                message: e.message
            };
        });
        console.log(validationErrors);
        return res.status(400).json({ 
            success: false, 
            error: error.message, 
            validationErrors: validationErrors
        });
    }
    if (error instanceof DatabaseError) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: "Erro interno do servidor" });
};





