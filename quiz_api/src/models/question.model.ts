import { DataTypes, Model } from 'sequelize';
import { sequelizeInstance } from '../../config/config';
import Quiz from './quizzes.model';

interface QuestionAttributes {
  question_id?: number;
  quiz_id: number;
  chapter_name: string;
  question_text: string;
  marks: number;
}

class Question extends Model<QuestionAttributes> implements QuestionAttributes {
  public question_id!: number;
  public quiz_id!: number;
  public chapter_name!: string;
  public question_text!: string;
  public marks!: number;
}

Question.init(
  {
    question_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Quiz,
        key: 'quiz_id',
      },
    },
    chapter_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    marks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'Question',
    tableName: 'Questions',
    timestamps: false,
  }
);

export default Question;
