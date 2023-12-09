import Router from "express"
import { verifyTokenAuthentication } from "../middlewares/verifyTokenAuthenticantion"
import { IssueUseCase } from "../modules/issues/issueUseCase"
import { IssuesController } from "../controllers/issues-controller"


const router = Router()
const issueUseCase = new IssueUseCase()
const issueController = new IssuesController(issueUseCase)


router.post('/issues/new', verifyTokenAuthentication, issueController.createIssue)

router.get('/issues/:id', issueController.getIssueById)

router.put('/issues/:id', issueController.updateIssue)

router.delete('/issues/:id', issueController.deleteIssue)

router.get('/issues', issueController.getAllIssues)


export default router