import { ZodError } from 'zod';

export class ValidationError extends Error {
    public details: ZodError;

    constructor(message: string, details: ZodError) {
        super(message);
        this.name = "ValidationError";
        this.details = details;
    }
}
export class DatabaseError extends Error {
    constructor(public message: string) {
        super(message);
        this.name = "DatabaseError";
    }
}
