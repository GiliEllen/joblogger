import React, { useState } from 'react';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../util/util';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  showPassword: boolean,
  repeatPassword: string;
  showRepeatPassword: boolean,
  jobField: string;
  phoneNumber: string;
}

const RegisterForm: React.FC = () => {

  const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');
    const [passwordValidated, setPasswordValidated] = useState(false)

    const [passwordErrors, setPasswordErrors] = useState({
      hasCapital: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecialChar: false,
    });

    const [formData, setFormData] = useState<RegisterFormData>({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      showPassword: false,
      repeatPassword: '',
      showRepeatPassword: false,
      jobField: '',
      phoneNumber: '',
    });

    const togglePasswordVisibility = (field: string) => {
      setFormData((prevFormDataPassword:any) => ({
        ...prevFormDataPassword,
        [field]: !prevFormDataPassword[field],
      }));
    };

    const validatePassword = (ev:any) => {
      const password = ev.target.value
      const errors = {
        hasCapital: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*]/.test(password),
      };

      if(!errors.hasCapital || !errors.hasLowercase || !errors.hasNumber || !errors.hasSpecialChar) {
        setPasswordValidated(false)
      } else {
        setPasswordValidated(true)
      }
  
      setPasswordErrors(errors);
    };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const validateForm = () => {
    let valid = true;
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!passwordValidated) {
      valid = false;
    } 
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
    // Perform validation here (e.g., email format, password match, etc.)

    try {
      console.log(formData)
      const response = await axios.post(`${API_URL}/api/users/register`, {formData});
      console.log('Registration successful:', response.data);
      if (response.data.register) {
        navigate("/home");
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error (e.g., show an error message, reset form, etc.)
    }
}
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Email Address:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        {emailError && <div className="error">{emailError}</div>}
      </div>
      <div>
        <label>
          Password:
          <div className="password-field">
            <input
              type={formData.showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onInput={validatePassword}
            />
            {/* <FontAwesomeIcon
              icon={formData.showPassword ? faEyeSlash : faEye}
              onClick={() => togglePasswordVisibility('showPassword')}
            /> */}
          </div>
        </label>
        </div>
      <div>
        <div style={{ color: passwordErrors.hasCapital ? 'green' : 'red' }}>
          {passwordErrors.hasCapital
            ? 'Contains at least one capital letter'
            : 'Missing a capital letter'}
        </div>
        <div style={{ color: passwordErrors.hasLowercase ? 'green' : 'red' }}>
          {passwordErrors.hasLowercase
            ? 'Contains at least one lowercase letter'
            : 'Missing a lowercase letter'}
        </div>
        <div style={{ color: passwordErrors.hasNumber ? 'green' : 'red' }}>
          {passwordErrors.hasNumber
            ? 'Contains at least one number'
            : 'Missing a number'}
        </div>
        <div style={{ color: passwordErrors.hasSpecialChar ? 'green' : 'red' }}>
          {passwordErrors.hasSpecialChar
            ? 'Contains at least one special character'
            : 'Missing a special character'}
        </div>
      </div>
      <div>
        <label>
          Repeat Password:
          <div className="password-field">
            <input
              type={formData.showRepeatPassword ? 'text' : 'password'}
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
            />
            {/* <FontAwesomeIcon
              icon={formData.showRepeatPassword ? faEyeSlash : faEye}
              onClick={() => togglePasswordVisibility('showRepeatPassword')}
            /> */}
          </div>
        </label>
      </div>
      <div>
        <label>
          Job Field:
          <input
            type="text"
            name="jobField"
            value={formData.jobField}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
