export type Gender = 'Male' | 'Female';

export type Inputs = {
  name: string;
  birthdate: Date;
  sex: Gender;
  city: string;
  doctorSpeciality: string;
  doctor: string;
  email: string;
  phone: string;
};

export interface CityOption {
  id: string;
  name: string;
}

export interface DoctorSpecialityOption {
  id: string;
  name: string;
  params?: {
    gender?: Gender;
    maxAge?: number;
    minAge?: number;
  };
}

export interface DoctorOption {
  id: string;
  name: string;
  surname: string;
  specialityId: string;
  isPediatrician: boolean;
  cityId: string;
}
