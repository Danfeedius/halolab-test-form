import { CityOption, DoctorOption, DoctorSpecialityOption } from './types';

export const fetchCitiesData = (cb: (data: CityOption[]) => void) => {
  fetch('https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4')
    .then((response) => {
      return response.json();
    })
    .then(cb);
};

export const fetchDoctorSpecialtiesData = (cb: (data: DoctorSpecialityOption[]) => void) => {
  fetch('https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca')
    .then((response) => {
      return response.json();
    })
    .then(cb);
};

export const fetchDoctorsData = (cb: (data: DoctorOption[]) => void) => {
  fetch('https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21')
    .then((response) => {
      return response.json();
    })
    .then(cb);
};
