import express from "express";
import * as questionController from "../controllers/questionController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authenticateToken);

// Routes that require authentication
router.get('/questions', questionController.getAllQuestions);
router.get('/questions/:id', questionController.getQuestionById);
router.post('/questions/create', questionController.createQuestion);
router.put('/questions/:id', questionController.updateQuestion);
router.delete('/questions/:id', questionController.deleteQuestion);

export default router;