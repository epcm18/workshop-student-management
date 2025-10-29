import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lecturer } from "./lecturer";

@Entity("student")
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.students)
  lecturer!: Lecturer;
}
