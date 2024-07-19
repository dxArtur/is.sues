"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyTokenAuthenticantion_1 = require("../middlewares/verifyTokenAuthenticantion");
const issueUseCase_1 = require("../modules/issues/issueUseCase");
const issues_controller_1 = require("../controllers/issues-controller");
const router = (0, express_1.default)();
const issueUseCase = new issueUseCase_1.IssueUseCase();
const issueController = new issues_controller_1.IssuesController(issueUseCase);
router.post('/issues/new', verifyTokenAuthenticantion_1.verifyTokenAuthentication, issueController.createIssue);
router.get('/issues/:id', verifyTokenAuthenticantion_1.verifyTokenAuthentication, issueController.getIssueById);
router.put('/issues/:id', verifyTokenAuthenticantion_1.verifyTokenAuthentication, issueController.updateIssue);
router.delete('/issues/:id', verifyTokenAuthenticantion_1.verifyTokenAuthentication, issueController.deleteIssue);
router.get('/issues', verifyTokenAuthenticantion_1.verifyTokenAuthentication, issueController.getAllIssues);
exports.default = router;
