export interface User {
  student: Student;
  token: string;
}

export interface Student {
  _id: string;
  account_number: string;
  name: string;
  email: string;
  isActive: boolean;
  rol: string[];
  acumulate_hours: number;
  gender: string;
  career_years: number;
  contact_phone: string;
  birth_date: Date;
  inscription_year: number;
  __v: number;
}

export interface CreateStudent {
  account_number?: string;
  name?: string;
  email?: string;
  isActive?: boolean;
  rol?: string[];
  acumulate_hours?: number;
  gender?: string;
  career_years?: number;
  contact_phone?: string;
  birth_date?: string;
  inscription_year?: number;
}
