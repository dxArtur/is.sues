"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentController = void 0;
class DepartmentController {
    constructor(departmentUseCase) {
        this.createDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, companyId } = req.body;
                const response = yield this.caseUse.createDepartment({ name, companyId });
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.getDepartmentById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield this.caseUse.getDepartmentsById({ id });
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, companyId } = req.body;
            try {
                const response = yield this.caseUse.updateDepartment({ id, name, companyId });
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const response = yield this.caseUse.deleteDepartment({ id });
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllDepartments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.caseUse.listDepartments();
                return res.status(200).json(response);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
        this.caseUse = departmentUseCase;
    }
}
exports.DepartmentController = DepartmentController;
