import express from "express";
import * as quizController from "../controllers/quizController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authenticateToken);

// Routes that require authentication
router.get('/quizzes', quizController.getAllQuizzes);
router.get('/quizzes/:id', quizController.getQuizById);
router.post('/quizzes/create', quizController.createQuiz);
router.put('/quizzes/:id', quizController.updateQuiz);
router.delete('/quizzes/:id', quizController.deleteQuiz);

export default router;