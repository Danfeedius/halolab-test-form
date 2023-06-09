import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { getCitiesData, getDoctorSpecialtiesData, getDoctorsData } from './api';
import { CityOption, DoctorOption, DoctorSpecialityOption, Gender, Inputs } from './types';

export const useMainForm = () => {
  const {
    getValues,
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  // submit handler

  const onSubmit: SubmitHandler<Inputs> = (inputs) => console.table(inputs);

  // api data lists
  const [cities, setCities] = useState<CityOption[]>([]);
  const [doctorSpecialties, setDoctorSpecialties] = useState<DoctorSpecialityOption[]>([]);
  const [doctors, setDoctors] = useState<DoctorOption[]>([]);

  // dirty fields check values
  const [age, setAge] = useState<number>();
  const [sex, setSex] = useState<Gender>();
  const [city, setCity] = useState<string>();
  const [isEmailRequired, setIsEmailRequired] = useState<boolean>(true);

  const [doctorSpeciality, setDoctorSpeciality] = useState<string>();

  // filtered lists
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorOption[]>([]);
  const [filteredDoctorSpecialties, setFilteredDoctorSpecialties] = useState<DoctorSpecialityOption[]>([]);

  useEffect(() => {
    getCitiesData().then(setCities);
    getDoctorSpecialtiesData().then(setDoctorSpecialties);
    getDoctorsData().then(setDoctors);
  }, []);

  const getAge = useCallback((birthday: Date) => {
    const today = new Date();
    const age = today.getFullYear() - birthday.getFullYear();
    return age;
  }, []);

  // subscription and update effect
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == 'birthdate' && value.birthdate) setAge(getAge(new Date(value.birthdate)));
      if (name == 'sex' && value.sex) setSex(value.sex);
      if (name == 'city' && value.city) setCity(value.city);
      if (name == 'doctorSpeciality' && value.doctorSpeciality) setDoctorSpeciality(value.doctorSpeciality);

      if (name == 'doctor' && value.doctor) {
        const values = getValues();
        const doctor = doctors.find((doctor) => doctor.id == value.doctor) as DoctorOption;

        !values.city && setValue('city', doctor.cityId);
        !values.doctorSpeciality && setValue('doctorSpeciality', doctor.specialityId);
      }
      if (name == 'email') {
        value.email && setIsEmailRequired(true);
      }
      if (name == 'phone') {
        value.phone && setIsEmailRequired(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [doctors, getAge, getValues, setValue, watch]);

  // filter of Doctors list
  useEffect(() => {
    const filtered = doctors.filter((doctor) => {
      let isCorrectAge = true;
      let isCorrectCity = true;
      let isCorrectSpeciality = true;
      if (doctorSpeciality) {
        isCorrectSpeciality = doctorSpeciality == doctor.specialityId;
      } else {
        isCorrectSpeciality = !!filteredDoctorSpecialties.find((speciality) => speciality.id == doctor.specialityId);
      }

      if (age) {
        isCorrectAge = age >= 18 ? !doctor.isPediatrician : doctor.isPediatrician;
      }

      if (city) {
        isCorrectCity = city == doctor.cityId;
      }

      return isCorrectSpeciality && isCorrectAge && isCorrectCity;
    });

    setFilteredDoctors(filtered);
  }, [doctors, age, filteredDoctorSpecialties, city, doctorSpeciality]);

  const isCorrectAge = useCallback(
    (speciality: DoctorSpecialityOption) => {
      if (typeof age === 'undefined') return true;

      if (speciality?.params?.minAge) {
        return speciality.params.minAge <= age;
      }
      if (speciality?.params?.maxAge) {
        return speciality.params.maxAge >= age;
      }
      return true;
    },
    [age],
  );

  // filter of Doctors Specialities list
  useEffect(() => {
    const filteredSpecialities = doctorSpecialties.filter((speciality) => {
      let isCorrectSex = true;

      if (sex && speciality?.params?.gender) {
        isCorrectSex = speciality.params.gender == sex;
      }

      return isCorrectAge(speciality) && isCorrectSex;
    });

    setFilteredDoctorSpecialties(filteredSpecialities);
  }, [doctorSpecialties, age, sex, isCorrectAge]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    cities,
    filteredDoctors,
    filteredDoctorSpecialties,
    isEmailRequired,
  };
};
