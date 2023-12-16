import { Request, Response } from 'express';
import Question from '../models/question.model';

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { quiz_id, chapter_name, question_text, marks } = req.body;

    const newQuestion = await Question.create({
      quiz_id,
      chapter_name,
      question_text,
      marks,
    });

    res.status(201).json({ question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create question' });
  }
};

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);
    if (!question) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }
    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch question' });
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { chapter_name, question_text, marks } = req.body;

    const question = await Question.findByPk(id);
    if (!question) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }

    await question.update({ chapter_name, question_text, marks });

    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update question' });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const question = await Question.findByPk(id);
    if (!question) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }

    await question.destroy();

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete question' });
  }
};
