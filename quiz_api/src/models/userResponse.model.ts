import { DataTypes, Model } from 'sequelize';
import { sequelizeInstance } from '../../config/config';
import UserQuizAttempt from './userQuizAttempts.model';
import Question from './question.model';
import Answer from './answer.model';

interface UserResponseAttributes {
  response_id?: number;
  attempt_id: number;
  question_id: number;
  selected_answer_id: number;
}

class UserResponse extends Model<UserResponseAttributes> implements UserResponseAttributes {
  public response_id!: number;
  public attempt_id!: number;
  public question_id!: number;
  public selected_answer_id!: number;
}

UserResponse.init(
  {
    response_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    attempt_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserQuizAttempt,
        key: 'attempt_id',
      },
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Question,
        key: 'question_id',
      },
    },
    selected_answer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Answer,
        key: 'answer_id',
      },
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'UserResponse',
    tableName: 'User_Responses',
    timestamps: false,
  }
);

export default UserResponse;
