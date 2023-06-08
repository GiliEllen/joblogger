import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  company_name: string;
  company_description: string;
  title: string;
  title_description: string;
  jobField: string;
  connection: string;
  date_CV_sent: string;
  date_interview: string;
  notes: string;
  cv: File | null;
}



const AddJob = () => {
  const [formData, setFormData] = useState<FormData>({
    company_name: '',
    company_description: '',
    title: '',
    title_description: '',
    jobField: '',
    connection: '',
    date_CV_sent: '',
    date_interview: '',
    notes: '',
    cv: null,
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === 'cv') {
    //   setFormData({ ...formData, [name]: event.target.files?.[0] || null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const userId = 1
    const url = `/api/jobs/${userId}`;

    // const data = new FormData();
    // for (const key in formData) {
    //   data.append(key, formData[key]);
    // }

    try {
    //   await axios.post(url, data);
    console.log(formData)
      await axios.post(url, {formData});
      // Handle successful submission
      console.log('Form submitted successfully');
    } catch (error) {
      // Handle error
      console.error('Error submitting form', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Company Name:
        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
        />
      </label>

      <label>
        Company Description:
        <textarea
          name="company_description"
          value={formData.company_description}
          onChange={handleChange}
        />
      </label>

      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      <label>
        Title Description:
        <textarea
          name="title_description"
          value={formData.title_description}
          onChange={handleChange}
        />
      </label>

      <label>
        Job Field:
        <input
          type="text"
          name="jobField"
          value={formData.jobField}
          onChange={handleChange}
        />
      </label>

      <label>
        Connection:
        <input
          type="text"
          name="connection"
          value={formData.connection}
          onChange={handleChange}
        />
      </label>

      <label>
        Date CV Sent:
        <input
          type="date"
          name="date_CV_sent"
          value={formData.date_CV_sent}
          onChange={handleChange}
        />
      </label>

      <label>
        Date Interview:
        <input
          type="date"
          name="date_interview"
          value={formData.date_interview}
          onChange={handleChange}
        />
      </label>

      <label>
        Notes:
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </label>

      <label>
        CV:
        <input
          type="file"
          name="cv"
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddJob;
