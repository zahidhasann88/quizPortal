import express from "express";
import * as userQuizAttemptController from "../controllers/userQuizAttemtsController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authenticateToken);

// Routes that require authentication
router.get('/userQuizAttempts', userQuizAttemptController.getAllUserQuizAttempts);
router.get('/userQuizAttempts/:id', userQuizAttemptController.getUserQuizAttemptById);
router.post('/userQuizAttempts/create', userQuizAttemptController.createUserQuizAttempt);
router.put('/userQuizAttempts/:id', userQuizAttemptController.updateUserQuizAttempt);
router.delete('/userQuizAttempts/:id', userQuizAttemptController.deleteUserQuizAttempt);

export default router;