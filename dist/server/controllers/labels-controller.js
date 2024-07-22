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
exports.LabelController = void 0;
class LabelController {
    constructor(labelUseCase) {
        this.createLabel = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, departmentId } = req.body;
                const response = yield this.useCase.createLabel({ name, description, departmentId });
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.getLabelById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    return res.status(400).json({ message: "ID inválido" });
                }
                const response = yield this.useCase.getLabelById({ id });
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateLabel = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const { name, description, departmentId } = req.body;
            try {
                const response = yield this.useCase.updateLabel({ id, name, description, departmentId });
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.deletedLabel = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const response = yield this.useCase.deleteLabel({ id });
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.listLabels = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.useCase.listLabels({});
            return res.status(200).json(response);
        });
        this.useCase = labelUseCase;
    }
}
exports.LabelController = LabelController;
