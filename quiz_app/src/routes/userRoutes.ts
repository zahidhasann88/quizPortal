import express from "express";
import * as userController from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

// Unprotected routes
router.post('/users/create', userController.createUser);
router.post('/login', userController.login);

router.use(authenticateToken);

// Routes that require authentication
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

export default router;
