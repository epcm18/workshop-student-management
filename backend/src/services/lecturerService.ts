import { Lecturer } from "../models/lecturer";
import { Request, Response } from "express";
import { AppDataSource } from "../index";

export class LecturerService {
  static async addNewLecturer(req: Request): Promise<Lecturer[]> {
    try {
      const lecturerRepository = AppDataSource.getRepository(Lecturer);
      const newLecturer = lecturerRepository.create(req.body);
      const savedLecturer = await lecturerRepository.save(newLecturer);
      return savedLecturer;
    } catch (error) {
      console.error("Error adding a new student:", error);
      throw new Error("Internal Server Error");
    }
  }

  static async getAllLecturers(): Promise<Lecturer[]> {
    try {
      const lecturerRepository = AppDataSource.getRepository(Lecturer);
      const lecturers = await lecturerRepository.find();
      return lecturers;
    } catch (error) {
      console.error("Error getting all students:", error);
      throw new Error("Internal Server Error");
    }
  }
}
