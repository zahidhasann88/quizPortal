import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const dialect = process.env.DB_DIALECT || 'mysql';

const sequelizeInstance = new Sequelize({
  database: process.env.DB_NAME || 'your_database',
  username: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  dialect: dialect as any,
});

const port = process.env.PORT || 3000;

export { sequelizeInstance, port };
