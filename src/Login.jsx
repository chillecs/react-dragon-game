import { useEffect, useState } from 'react';
import z from 'zod/v4';
import { validateForm } from './utils/formValidation.js';
import { useAuthContext } from './AuthContext.jsx';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;

const validationSchema = z
  .object({
    email: z.email('Please provide a valid email address.'),
    password: z.string().min(6, 'Your password needs to be at least 6 characters long.'),
  });

export function Login() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
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
    const newFormValues = { ...formValues, [e.target.name]: e.target.value };

    if(errors) {
      const newErrors = validateForm(newFormValues, validationSchema);
      setErrors(newErrors);
    }

    setFormValues(newFormValues);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    const dataAsObject = {...formValues};
    const errors = validateForm(dataAsObject, validationSchema);
    if (errors) {
      setErrors(errors);
      return;
    }

    setErrors(null);

    const response = await fetch(`${apiUrl}/login`, {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                  errors?.email ? 'border-red-400' : 'border-white/20'
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                placeholder="Email"
              />
              {errors?.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                  errors?.password ? 'border-red-400' : 'border-white/20'
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                placeholder="Password"
              />
              {errors?.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
              >
                Create one here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
