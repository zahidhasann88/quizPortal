import { Request, Response } from 'express';
import Quiz from '../models/quizzes.model';

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { quiz_name, created_by, date_created } = req.body;

    const newQuiz = await Quiz.create({
      quiz_name,
      created_by,
      date_created,
    });

    res.status(201).json({ quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create quiz' });
  }
};

export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.findAll();
    res.status(200).json({ quizzes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quizzes' });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByPk(id);
    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }
    res.status(200).json({ quiz });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quiz' });
  }
};

export const updateQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quiz_name } = req.body;

    const quiz = await Quiz.findByPk(id);
    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }

    await quiz.update({ quiz_name });

    res.status(200).json({ quiz });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update quiz' });
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findByPk(id);
    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }

    await quiz.destroy();

    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete quiz' });
  }
};
