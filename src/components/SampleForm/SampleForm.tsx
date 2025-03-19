/* import React, { useState } from 'react';

type FormValues = {
  name: string;
  email: string;
  password: string;
  gender: string;
  agreeToTerms: boolean;
};

const initialFormValues: FormValues = {
  name: '',
  email: '',
  password: '',
  gender: '',
  agreeToTerms: false,
};

export const SampleForm = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Partial<FormValues> = {};
    if (!formValues.name) newErrors.name = 'Name is required';
    if (!formValues.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formValues.password) {
      newErrors.password = 'Password is required';
    } else if (formValues.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (!formValues.gender) newErrors.gender = 'Gender is required';
    if (!formValues.agreeToTerms)
      newErrors.agreeToTerms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Form submitted successfully');
      setFormValues(initialFormValues);
    } catch (error) {
      alert('Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
        </label>
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
        </label>
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Gender:
          <select
            name="gender"
            value={formValues.gender}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formValues.agreeToTerms}
            onChange={handleChange}
          />
          I agree to the terms and conditions
        </label>
        {errors.agreeToTerms && (
          <p style={{ color: 'red' }}>{errors.agreeToTerms}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !validate()}
        style={{
          backgroundColor: isSubmitting ? '#ddd' : '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
        }}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};


export default SampleForm; */

/*  import React, { useState } from 'react';
import { Grid2 as Grid , Box, Paper} from '@mui/material';

type FormValues = {
    name: string;
    email: string;
    password: string;
    gender: string;
    agreeToTerms: boolean;
  };
  
  const initialFormValues: FormValues = {
    name: '',
    email: '',
    password: '',
    gender: '',
    agreeToTerms: false,
  };

const SampleForm =() => {

    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    const [errors, setErrors] = useState<Partial<FormValues>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const validate = () => {
      const newErrors: Partial<FormValues> = {};
      if (!formValues.name) newErrors.name = 'Name is required';
      if (!formValues.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!formValues.password) {
        newErrors.password = 'Password is required';
      } else if (formValues.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long';
      }
      if (!formValues.gender) newErrors.gender = 'Gender is required';
      if (!formValues.agreeToTerms)
        newErrors.agreeToTerms = false;
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value, type, checked } = e.target;
      setFormValues((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
  
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert('Form submitted successfully');
        setFormValues(initialFormValues);
      } catch (error) {
        alert('Submission failed');
      } finally {
        setIsSubmitting(false);
      }
    };







  return (
    <>
                    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
        </label>
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
        </label>
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Gender:
          <select
            name="gender"
            value={formValues.gender}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formValues.agreeToTerms}
            onChange={handleChange}
          />
          I agree to the terms and conditions
        </label>
        {errors.agreeToTerms && (
          <p style={{ color: 'red' }}>{errors.agreeToTerms}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !validate()}
        style={{
          backgroundColor: isSubmitting ? '#ddd' : '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
        }}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>

    </>
  );
};

export default SampleForm; */

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio
} from '@mui/material';

type FormValues = {
  name: string;
  email: string;
  password: string;
  gender: string;
  agreeToTerms: boolean;
};

const initialFormValues: FormValues = {
  name: '',
  email: '',
  password: '',
  gender: '',
  agreeToTerms: false,
};

export const SampleForm = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Partial<FormValues> = {};
    if (!formValues.name) newErrors.name = 'Name is required';
    if (!formValues.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formValues.password) {
      newErrors.password = 'Password is required';
    } else if (formValues.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (!formValues.gender) newErrors.gender = 'Gender is required';
    if (!formValues.agreeToTerms) newErrors.agreeToTerms = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Form submitted successfully');
      setFormValues(initialFormValues);
    } catch (error) {
      alert('Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <TextField
        label="Name"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formValues.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
      />

      <FormControl fullWidth error={!!errors.gender}>
        <FormLabel>Gender</FormLabel>
        <RadioGroup row name="gender" value={formValues.gender} onChange={handleChange}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
        {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
      </FormControl>

      <FormControl fullWidth>
        <Select name="gender" value={formValues.gender} onChange={handleChange} displayEmpty>
          <MenuItem value="">Select gender</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={<Checkbox name="agreeToTerms" checked={formValues.agreeToTerms} onChange={handleChange} />}
        label="I agree to the terms and conditions"
      />
      {errors.agreeToTerms && <p style={{ color: 'red' }}>{errors.agreeToTerms}</p>}

      {/*  <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting || !validate()}
        startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button> */}
    </Box>
  );
};

export default SampleForm;
