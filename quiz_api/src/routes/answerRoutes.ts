import express from "express";
import * as answerController from "../controllers/answerController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authenticateToken);

// Routes that require authentication
router.get('/questions', answerController.getAllAnswers);
router.get('/questions/:id', answerController.getAnswerById);
router.post('/questions/create', answerController.createAnswer);
router.put('/questions/:id', answerController.updateAnswer);
router.delete('/questions/:id', answerController.deleteAnswer);

export default router;