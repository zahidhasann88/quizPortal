import { DataTypes, Model } from 'sequelize';
import { sequelizeInstance } from '../../config/config';
import Question from './question.model';

interface AnswerAttributes {
  answer_id?: number;
  question_id: number;
  answer_text: string;
  is_correct: boolean;
}

class Answer extends Model<AnswerAttributes> implements AnswerAttributes {
  public answer_id!: number;
  public question_id!: number;
  public answer_text!: string;
  public is_correct!: boolean;
}

Answer.init(
  {
    answer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Question,
        key: 'question_id',
      },
    },
    answer_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'Answer',
    tableName: 'Answers',
    timestamps: false,
  }
);

export default Answer;
