"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const labelsUseCase_1 = require("../modules/labels/labelsUseCase");
const labels_controller_1 = require("../controllers/labels-controller");
const verifyTokenAuthenticantion_1 = require("../middlewares/verifyTokenAuthenticantion");
const router = express_1.default.Router();
const labelUseCase = new labelsUseCase_1.LabelUseCase();
const labelController = new labels_controller_1.LabelController(labelUseCase);
router.post('/labels', verifyTokenAuthenticantion_1.verifyTokenAuthentication, verifyTokenAuthenticantion_1.verifyAdminAuth, labelController.createLabel);
router.get('/labels/:id', labelController.getLabelById);
router.put('/labels/:id', verifyTokenAuthenticantion_1.verifyTokenAuthentication, verifyTokenAuthenticantion_1.verifyAdminAuth, labelController.updateLabel);
router.delete('/labels/:id', verifyTokenAuthenticantion_1.verifyTokenAuthentication, verifyTokenAuthenticantion_1.verifyAdminAuth, labelController.deletedLabel);
router.get('/labels', labelController.listLabels);
exports.default = router;
