import { Request, Response } from 'express';
import UserQuizAttempt from '../models/userQuizAttempts.model';

// Create a user quiz attempt
export const createUserQuizAttempt = async (req: Request, res: Response) => {
  try {
    const { user_id, quiz_id, attempt_date, score } = req.body;

    const newUserQuizAttempt = await UserQuizAttempt.create({
      user_id,
      quiz_id,
      attempt_date,
      score,
    });

    res.status(201).json({ userQuizAttempt: newUserQuizAttempt });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user quiz attempt' });
  }
};

// Get all user quiz attempts
export const getAllUserQuizAttempts = async (req: Request, res: Response) => {
  try {
    const userQuizAttempts = await UserQuizAttempt.findAll();
    res.status(200).json({ userQuizAttempts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user quiz attempts' });
  }
};

// Get user quiz attempt by ID
export const getUserQuizAttemptById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userQuizAttempt = await UserQuizAttempt.findByPk(id);
    if (userQuizAttempt) {
      res.status(200).json({ userQuizAttempt });
    } else {
      res.status(404).json({ message: 'User quiz attempt not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user quiz attempt' });
  }
};

// Update user quiz attempt
export const updateUserQuizAttempt = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id, quiz_id, attempt_date, score } = req.body;
  try {
    const userQuizAttempt = await UserQuizAttempt.findByPk(id);
    if (userQuizAttempt) {
      userQuizAttempt.user_id = user_id;
      userQuizAttempt.quiz_id = quiz_id;
      userQuizAttempt.attempt_date = attempt_date;
      userQuizAttempt.score = score;
      await userQuizAttempt.save();
      res.status(200).json({ userQuizAttempt });
    } else {
      res.status(404).json({ message: 'User quiz attempt not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user quiz attempt' });
  }
};

// Delete user quiz attempt
export const deleteUserQuizAttempt = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userQuizAttempt = await UserQuizAttempt.findByPk(id);
    if (userQuizAttempt) {
      await userQuizAttempt.destroy();
      res.status(200).json({ message: 'User quiz attempt deleted successfully' });
    } else {
      res.status(404).json({ message: 'User quiz attempt not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user quiz attempt' });
  }
};
