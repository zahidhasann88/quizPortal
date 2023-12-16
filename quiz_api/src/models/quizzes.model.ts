import { DataTypes, Model } from 'sequelize';
import { sequelizeInstance } from '../../config/config';
import User from './user.model';

interface QuizAttributes {
  quiz_id?: number;
  quiz_name: string;
  created_by: number;
  date_created: Date;
}

class Quiz extends Model<QuizAttributes> implements QuizAttributes {
  public quiz_id!: number;
  public quiz_name!: string;
  public created_by!: number;
  public date_created!: Date;
}

Quiz.init(
  {
    quiz_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quiz_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'Quiz',
    tableName: 'Quizzes',
    timestamps: false,
  }
);

export default Quiz;
