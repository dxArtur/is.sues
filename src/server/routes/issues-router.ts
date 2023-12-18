import Router from "express"
import { verifyTokenAuthentication, verifyAdminAuth } from "../middlewares/verifyTokenAuthenticantion"
import { IssueUseCase } from "../modules/issues/issueUseCase"
import { IssuesController } from "../controllers/issues-controller"


const router = Router()
const issueUseCase = new IssueUseCase()
const issueController = new IssuesController(issueUseCase)


router.post('/issues/new', verifyTokenAuthentication, issueController.createIssue)

router.get('/issues/:id', verifyTokenAuthentication,issueController.getIssueById)

router.put('/issues/:id', verifyTokenAuthentication,issueController.updateIssue)

router.delete('/issues/:id', verifyTokenAuthentication, issueController.deleteIssue)

router.get('/issues', verifyTokenAuthentication,issueController.getAllIssues)


export default router