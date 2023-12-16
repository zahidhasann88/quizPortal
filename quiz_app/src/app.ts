import express from "express";
import { sequelizeInstance, port } from "./../config/config";
import cors from "cors";
import logger from "./middlewares/logger";
import { requestLogger } from "./middlewares/requestHandler";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = port;
const sequelize = sequelizeInstance;

app.use(cors());
app.use(logger);
app.use(express.json());
app.use(requestLogger);

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
