import './MainForm.css';
import { VALIDATION_ERROR_MESSAGES } from './constants';

import { useMainForm } from './hooks';

export const MainForm = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    cities,
    filteredDoctors,
    filteredDoctorSpecialties,
    isEmailRequired,
  } = useMainForm();

  return (
    <form className="main-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name" className="input-label">
        Name
      </label>
      <div className="input-container">
        <input
          className="input"
          type="text"
          id="name"
          placeholder="Name"
          {...register('name', { required: true, pattern: /^\D+$/ })}
        />
        {errors.name && errors.name.type == 'required' && (
          <span className="error-message">{VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD}</span>
        )}
        {errors.name && errors.name.type == 'pattern' && (
          <span className="error-message">{VALIDATION_ERROR_MESSAGES.NON_DIGIT_PATTERN}</span>
        )}
      </div>

      <label htmlFor="birthdate" className="input-label">
        Birhday date
      </label>
      <div className="input-container">
        <input className="input" type="date" {...register('birthdate', { required: true })} />
        {errors.birthdate && <span className="error-message">{VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD}</span>}
      </div>

      <label htmlFor="sex" className="input-label">
        Sex
      </label>
      <div className="input-container">
        <select className="select" id="sex" {...register('sex', { required: true })}>
          <option disabled selected value="">
            -- select an option --
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.sex && <span className="error-message">{VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD}</span>}
      </div>
      <label htmlFor="city" className="input-label">
        City
      </label>
      <div className="input-container">
        <select className="select" id="city" {...register('city', { required: true })}>
          <option disabled selected value="">
            -- select an option --
          </option>

          {cities.length &&
            cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
        </select>
        {errors.city && <span className="error-message">{VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD}</span>}
      </div>
      <label htmlFor="doctorSpeciality" className="input-label">
        Doctor speciality
      </label>
      <div className="input-container">
        <select className="select" id="doctorSpeciality" {...register('doctorSpeciality')}>
          <option disabled selected value="">
            -- select an option --
          </option>
          {filteredDoctorSpecialties.length &&
            filteredDoctorSpecialties.map((speciality) => (
              <option key={speciality.id} value={speciality.id}>
                {speciality.name}
              </option>
            ))}
        </select>
        {errors.doctorSpeciality && <span className="error-message">{VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD}</span>}
      </div>

      <label htmlFor="doctor" className="input-label">
        Doctor
      </label>
      <div className="input-container">
        <select className="select" id="doctor" {...register('doctor', { required: true })}>
          <option disabled selected value="">
            -- select an option --
          </option>
          {filteredDoctors.length &&
            filteredDoctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} {doctor.surname}
              </option>
            ))}
        </select>
        {errors.doctor && <span className="error-message">{VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD}</span>}
      </div>

      <label htmlFor="email" className="input-label">
        Email
      </label>
      <div className="input-container">
        <input
          className="input"
          id="email"
          type="email"
          placeholder="mail@post.com"
          {...register('email', { required: isEmailRequired, pattern: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/ })}
        />
        {errors.email && errors.email.type == 'required' && isEmailRequired && (
          <span className="error-message">{VALIDATION_ERROR_MESSAGES.REQUIRED_EMAIL_OR_PHONE_NUMBER}</span>
        )}
      </div>

      <label htmlFor="name" className="input-label">
        Phone
      </label>
      <div className="input-container">
        <input
          className="input"
          id="phone"
          type="phone"
          placeholder="+380 999 99 99 99"
          {...register('phone', {
            required: !isEmailRequired,
            pattern:
              /^[+]?[(]?[0-9]{2,3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3}[-\s.]?([0-9]{2,3}|(([0-9]{4})|([0-9]{2}[-\s.]?[0-9]{2})))$/,
            //complicated phone number regex pattern
          })}
        />
        {errors.phone && errors.phone.type == 'pattern' && (
          <span className="error-message">{VALIDATION_ERROR_MESSAGES.PHONE_NUMBER_PATTERN}</span>
        )}
      </div>

      <input className="input submit" type="submit" />
    </form>
  );
};
