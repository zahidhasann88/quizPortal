import { Request, Response } from 'express';
import UserResponse from '../models/userResponse.model';

// Create a user response
export const createUserResponse = async (req: Request, res: Response) => {
  try {
    const { attempt_id, question_id, selected_answer_id } = req.body;

    const newUserResponse = await UserResponse.create({
      attempt_id,
      question_id,
      selected_answer_id,
    });

    res.status(201).json({ userResponse: newUserResponse });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user response' });
  }
};

// Get all user responses
export const getAllUserResponses = async (req: Request, res: Response) => {
  try {
    const userResponses = await UserResponse.findAll();
    res.status(200).json({ userResponses });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user responses' });
  }
};

// Get user response by ID
export const getUserResponseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userResponse = await UserResponse.findByPk(id);
    if (userResponse) {
      res.status(200).json({ userResponse });
    } else {
      res.status(404).json({ message: 'User response not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user response' });
  }
};

// Update user response
export const updateUserResponse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { attempt_id, question_id, selected_answer_id } = req.body;
  try {
    const userResponse = await UserResponse.findByPk(id);
    if (userResponse) {
      userResponse.attempt_id = attempt_id;
      userResponse.question_id = question_id;
      userResponse.selected_answer_id = selected_answer_id;
      await userResponse.save();
      res.status(200).json({ userResponse });
    } else {
      res.status(404).json({ message: 'User response not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user response' });
  }
};

// Delete user response
export const deleteUserResponse = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userResponse = await UserResponse.findByPk(id);
    if (userResponse) {
      await userResponse.destroy();
      res.status(200).json({ message: 'User response deleted successfully' });
    } else {
      res.status(404).json({ message: 'User response not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user response' });
  }
};
