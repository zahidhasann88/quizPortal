import { Request, Response } from 'express';
import Answer from '../models/answer.model';

export const createAnswer = async (req: Request, res: Response) => {
  try {
    const { question_id, answer_text, is_correct } = req.body;

    const newAnswer = await Answer.create({
      question_id,
      answer_text,
      is_correct,
    });

    res.status(201).json({ answer: newAnswer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create answer' });
  }
};

export const getAllAnswers = async (req: Request, res: Response) => {
  try {
    const answers = await Answer.findAll();
    res.status(200).json({ answers });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch answers' });
  }
};

export const getAnswerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const answer = await Answer.findByPk(id);
    if (!answer) {
      res.status(404).json({ message: 'Answer not found' });
      return;
    }
    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch answer' });
  }
};

export const updateAnswer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { answer_text, is_correct } = req.body;

    const answer = await Answer.findByPk(id);
    if (!answer) {
      res.status(404).json({ message: 'Answer not found' });
      return;
    }

    await answer.update({ answer_text, is_correct });

    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update answer' });
  }
};

export const deleteAnswer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const answer = await Answer.findByPk(id);
    if (!answer) {
      res.status(404).json({ message: 'Answer not found' });
      return;
    }

    await answer.destroy();

    res.status(200).json({ message: 'Answer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete answer' });
  }
};
