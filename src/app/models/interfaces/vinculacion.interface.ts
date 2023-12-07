import { Student } from './student.interface';

export interface Vinculacion {
  _id: string;
  name: string;
  type: string;
  state: string;
  atCharge: string;
  start_date: Date;
  end_date: Date;
  hours: number;
  students_limit: number;
  budget: number;
  description: string;
  students: Student[];
  __v: number;
}

export interface CreateVinculacion {
  name: string;
  type: string;
  state: string;
  atCharge: string;
  start_date: Date;
  end_date: Date;
  hours: number;
  students_limit: number;
  budget: number;
  description: string;
}
