import { DataTypes, Model } from 'sequelize';
import { sequelizeInstance } from '../../config/config';
import User from './user.model';
import Quiz from './quizzes.model';

interface UserQuizAttemptAttributes {
  attempt_id?: number;
  user_id: number;
  quiz_id: number;
  attempt_date: Date;
  score: number;
}

class UserQuizAttempt extends Model<UserQuizAttemptAttributes> implements UserQuizAttemptAttributes {
  public attempt_id!: number;
  public user_id!: number;
  public quiz_id!: number;
  public attempt_date!: Date;
  public score!: number;
}

UserQuizAttempt.init(
  {
    attempt_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Quiz,
        key: 'quiz_id',
      },
    },
    attempt_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'UserQuizAttempt',
    tableName: 'User_Quiz_Attempts',
    timestamps: false,
  }
);

export default UserQuizAttempt;
