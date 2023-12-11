import { StudentInVinculacion } from './student.interface';

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
  students: StudentInVinculacion[];
  __v: number;
}

export interface CreateVinculacion {
  name?: string;
  type?: string;
  state?: string;
  atCharge?: string;
  start_date: string;
  end_date: string;
  hours?: number;
  students_limit?: number;
  budget?: number;
  description?: string;
  students?: StudentInVinculacion[];
}
