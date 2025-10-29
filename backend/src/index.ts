// src/index.ts
import express, { Express, Request, Response } from "express";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import studentRoute from "./routes/studentRoute";
import { Student } from "./models/student";
import { Lecturer } from "./models/lecturer";
import lecturerRoute from "./routes/lecturerRoute";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.LOCALHOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: true,
  entities: [Student, Lecturer],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to the database", err);
  });

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/student", studentRoute);
app.use("/lecturer", lecturerRoute);
