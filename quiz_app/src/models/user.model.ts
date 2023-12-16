import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "../../config/config";

interface UserAttributes {
  user_id?: number;
  name: string;
  username: string;
  email: string;
  password: string;
  date_registered: Date;
  role: "admin" | "user";
}

class User extends Model<UserAttributes> implements UserAttributes {
    public user_id!: number;
    public name!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public date_registered!: Date;
    public role!: 'admin' | 'user';
  }

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_registered: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

export default User;
