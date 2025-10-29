import { Request, Response } from "express";
import { LecturerService } from "../services/lecturerService";

export class LecturerController {
  static async addNewLecture(req: Request, res: Response) {
    try {
      const savedLecturer = await LecturerService.addNewLecturer(req);
      res.status(201).json(savedLecturer);
    } catch (error) {
      console.error("Error adding a new student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getAllLecturers(_req: Request, res: Response) {
    try {
      const lecturers = await LecturerService.getAllLecturers();
      res.status(200).json(lecturers);
    } catch (error) {
      console.error("Error getting all students:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
