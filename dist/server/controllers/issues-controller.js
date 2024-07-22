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
exports.IssuesController = void 0;
class IssuesController {
    constructor(issueUseCase) {
        this.createIssue = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, departmentId, authorId } = req.body;
                const response = yield this.useCase.createIssue({ title, description, departmentId, authorId });
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.getIssueById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield this.useCase.getIssuesById({ id });
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateIssue = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, description, status, departmentId, authorId } = req.body;
                const response = yield this.useCase.updateIssue({ id, title, description, status, departmentId, authorId });
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteIssue = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield this.useCase.deleteIssue({ id });
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllIssues = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.useCase.listIssues({});
            return res.status(200).json(response);
        });
        this.useCase = issueUseCase;
    }
}
exports.IssuesController = IssuesController;
