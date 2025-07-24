import React, { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { validateForm } from "./utils/formValidation";
import { useAuthContext } from "./AuthContext";

const apiUrl = import.meta.env.VITE_API_URL;

const validationSchema = z
  .object({
    email: z.email('Please provide a valid email address.'),
    password: z.string().min(6, 'Your password needs to be at least 6 characters long.'),
    retypePassword: z.string().min(6, 'Please type the password again.'),
    firstName: z.string().min(1, 'Please tell us your first name.'),
    lastName: z.string().min(1,  'Please tell us your last name.'),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "The passwords didn't match.",
    path: ['retypePassword'],
  });

export function Register() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    retypePassword: '',
    firstName: '',
    lastName: '',
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);
  const { user, login } = useAuthContext();

  useEffect(() => {
    if(user) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  function handleInputChange(e) {
    // const newFormValues = {...formValues};
    // const inputName = e.target.name;
    // const inputValue = e.target.value;

    // newFormValues[inputName] = inputValue;
    // setFormValues(newFormValues);

    const newFormValues = { ...formValues, [e.target.name]: e.target.value };

    if(errors) {
      const newErrors = validateForm(newFormValues, validationSchema);
      setErrors(newErrors);
    }

    setFormValues(newFormValues);
  }


  async function handleSubmit(e) {
    e.preventDefault();
    // const form = e.target;
    // const data = new FormData(form);
    // const dataAsObject = Object.fromEntries(data.entries());
    
    const dataAsObject = {...formValues};
    const errors = validateForm(dataAsObject, validationSchema);
    if (errors) {
      setErrors(errors);
      return;
    }

    setErrors(null);
    delete dataAsObject.retypePassword;

    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
      body: JSON.stringify(dataAsObject),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      const data = await res.json();
      if(!res.ok) {
        if(res.status === 400) {
          if(typeof data === 'string') {
            toast.error(data);
          }
        }
        throw new Error(data);
      }
      return data;
    });

    login(response);
    toast.success('You have been logged in successfully!');
  }

  return (
    <form className="brandForm" onSubmit={handleSubmit} noValidate>
      <h1 className="fullGridWidth">Register</h1>

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formValues.email}
        onChange={handleInputChange}
      />
      {errors?.email && <p className="inputError">{errors.email[0]}</p>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formValues.password}
        onChange={handleInputChange}
      />
      {errors?.password && <p className="inputError">{errors.password[0]}</p>}

      <label htmlFor="retypePassword">Retype Password</label>
      <input
        type="password"
        id="retypePassword"
        name="retypePassword"
        value={formValues.retypePassword}
        onChange={handleInputChange}
      />
      {errors?.retypePassword && <p className="inputError">{errors.retypePassword[0]}</p>}

      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formValues.firstName}
        onChange={handleInputChange}
      />
      {errors?.firstName && <p className="inputError">{errors.firstName[0]}</p>}

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formValues.lastName}
        onChange={handleInputChange}
      />
      {errors?.lastName && <p className="inputError">{errors.lastName[0]}</p>}

      <button type="submit" className="secondGridColumn startOfColumn btn">
        Register
      </button>
    </form>
  );
}
