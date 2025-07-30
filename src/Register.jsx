import React, { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { validateForm } from "./utils/formValidation.js";
import { useAuthContext } from "./AuthContext.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

const validationSchema = z
  .object({
    email: z.email("Please provide a valid email address."),
    password: z
      .string()
      .min(6, "Your password needs to be at least 6 characters long."),
    retypePassword: z.string().min(6, "Please type the password again."),
    firstName: z.string().min(1, "Please tell us your first name."),
    lastName: z.string().min(1, "Please tell us your last name."),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "The passwords didn't match.",
    path: ["retypePassword"],
  });

export function Register() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    retypePassword: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);
  const { user, login } = useAuthContext();
  const [type, setType] = useState("password");

  useEffect(() => {
    if (user) {
      navigate("/");
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

    if (errors) {
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

    const dataAsObject = { ...formValues };
    const errors = validateForm(dataAsObject, validationSchema);
    if (errors) {
      setErrors(errors);
      return;
    }

    setErrors(null);
    delete dataAsObject.retypePassword;

    const response = await fetch(`${apiUrl}/register`, {
      method: "POST",
      body: JSON.stringify(dataAsObject),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 400) {
          if (typeof data === "string") {
            toast.error(data);
          }
        }
        throw new Error(data);
      }
      return data;
    });

    login(response);
    navigate("/");
    toast.success("You have been logged in successfully!");
  }

  function handleTogglePass() {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  }

  return (
    <form
      className="flex flex-col h-screen items-center justify-center"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex flex-col gap-6 p-6 rounded-2xl border-2 text-center">
        <h1 className="text-4xl font-bold mb-4">Register</h1>

        <div className="flex gap-6">
          <div className="flex-1">
            <label className="block text-center mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              className="w-full p-2 rounded-md border-2 border-gray-300"
              type="text"
              id="firstName"
              name="firstName"
              value={formValues.firstName}
              onChange={handleInputChange}
            />
            {errors?.firstName && (
              <p className="inputError">{errors.firstName[0]}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-center mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="w-full p-2 rounded-md border-2 border-gray-300"
              type="text"
              id="lastName"
              name="lastName"
              value={formValues.lastName}
              onChange={handleInputChange}
            />
            {errors?.lastName && (
              <p className="inputError">{errors.lastName[0]}</p>
            )}
          </div>
        </div>
        <label htmlFor="email">Email</label>
        <input
          className="p-2 rounded-md border-2 border-gray-300"
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
        {errors?.email && <p className="inputError">{errors.email[0]}</p>}

        <label htmlFor="password">Password</label>
        <input
          className="p-2 rounded-md border-2 border-gray-300"
          type={type}
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
        />
        {errors?.password && <p className="inputError">{errors.password[0]}</p>}

        <label htmlFor="retypePassword">Retype Password</label>
        <input
          className="p-2 rounded-md border-2 border-gray-300"
          type={type}
          id="retypePassword"
          name="retypePassword"
          value={formValues.retypePassword}
          onChange={handleInputChange}
        />
        <div className="flex flex-row-reverse items-center justify-center gap-2 select-none">
          <label htmlFor="showPass">Show Password</label>
          <input type="checkbox" id="showPass" onClick={handleTogglePass} />
        </div>
        {errors?.retypePassword && (
          <p className="inputError">{errors.retypePassword[0]}</p>
        )}

        <button type="submit" className="btn-primary cursor-pointer">
          Register
        </button>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="hover:text-blue-500 transition cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
