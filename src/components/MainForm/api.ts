import { API_DOMAIN } from './constants';
import { CityOption, DoctorOption, DoctorSpecialityOption } from './types';

export const getCitiesData = async (): Promise<CityOption[]> =>
  await fetch(`${API_DOMAIN}/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4`).then((response) => response.json());

export const getDoctorSpecialtiesData = async (): Promise<DoctorSpecialityOption[]> =>
  await fetch(`${API_DOMAIN}/v3/e8897b19-46a0-4124-8454-0938225ee9ca`).then((response) => response.json());

export const getDoctorsData = async (): Promise<DoctorOption[]> =>
  await fetch(`${API_DOMAIN}/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21`).then((response) => response.json());
