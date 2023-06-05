import React, { useState } from 'react';
import axios from 'axios';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  jobField: string;
  phoneNumber: string;
}

const RegisterForm: React.FC = () => {
    const [emailError, setEmailError] = useState('');
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    jobField: '',
    phoneNumber: '',
  });

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
    // other validation checks
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
    // Perform validation here (e.g., email format, password match, etc.)

    try {
      const response = await axios.post('/api/users/register', formData);
      console.log('Registration successful:', response.data);
      // Handle success (e.g., show a success message, redirect, etc.)
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
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Repeat Password:
          <input
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
          />
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
