"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = require("../Error/CustomError");
const errorHandler = (error, req, res, next) => {
    if (error instanceof CustomError_1.ValidationError) {
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
    if (error instanceof CustomError_1.DatabaseError) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: "Erro interno do servidor" });
};
exports.errorHandler = errorHandler;
