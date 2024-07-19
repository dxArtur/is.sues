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
exports.CompanyController = void 0;
class CompanyController {
    constructor(companyUseCase) {
        this.createCompany = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, latitude, longitude, description, departments } = req.body;
                const response = yield this.caseUse.createCompany({ name, email, password, latitude, longitude, description, departments });
                return res.status(200).json(response);
            }
            catch (error) {
                next(error); // Passa o erro para o próximo middleware (errorHandler)
            }
        });
        this.getCompanyById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log('ID recebido:', id);
            const response = yield this.caseUse.getCompanyById({ id });
            return res.status(200).json(response);
        });
        this.updateCompany = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, email, password, description, departments } = req.body;
                const response = yield this.caseUse.updateCompany({ id, name, email, password, description, departments });
                return res.status(200).json(response);
            }
            catch (error) {
                next(error); // Passa o erro para o próximo middleware (errorHandler)
            }
        });
        this.deleteCompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield this.caseUse.deleteCompany({ id });
            return res.status(200).json(response);
        });
        this.getAllCompanies = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.caseUse.listCompanies({});
            return res.status(200).json(response);
        });
        this.deleteAllCompanies = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.caseUse.deleteAllCompanies();
            return res.status(200).json(response);
        });
        this.caseUse = companyUseCase;
    }
}
exports.CompanyController = CompanyController;
