import { useEffect, useState } from "react";
import z from "zod/v4";
import { validateForm } from "./utils/formValidation.js";
import { useAuthContext } from "./AuthContext.jsx";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const validationSchema = z.object({
  email: z.email("Please provide a valid email address."),
  password: z
    .string()
    .min(6, "Your password needs to be at least 6 characters long."),
});

export function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);
  const { user, login } = useAuthContext();

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

    const response = await fetch(`${apiUrl}/login`, {
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

  return (
    <form
      className="flex flex-col h-screen items-center justify-center"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex flex-col gap-6 p-6 rounded-2xl border-2 text-center">
        <h1 className="text-4xl font-bold mb-4">Login</h1>

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
          type="password"
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
        />
        {errors?.password && <p className="inputError">{errors.password[0]}</p>}

        <button type="submit" className="btn-primary">
          Login
        </button>
        <p>
          Already have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </form>
  );
}
