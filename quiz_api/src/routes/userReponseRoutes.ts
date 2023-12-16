import express from "express";
import * as userQuizResponseController from "../controllers/userResponseController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authenticateToken);

// Routes that require authentication
router.get('/userQuizAttempts', userQuizResponseController.getAllUserResponses);
router.get('/userQuizAttempts/:id', userQuizResponseController.getUserResponseById);
router.post('/userQuizAttempts/create', userQuizResponseController.createUserResponse);
router.put('/userQuizAttempts/:id', userQuizResponseController.updateUserResponse);
router.delete('/userQuizAttempts/:id', userQuizResponseController.deleteUserResponse);

export default router;