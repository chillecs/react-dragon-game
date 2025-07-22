import { useEffect, useState } from 'react';
import z from 'zod/v4';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { validateForm } from './utils/formValidation.js';
import { useAuthContext } from './AuthContext.jsx';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-300">Join the dragon adventure!</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                    errors?.firstName ? 'border-red-400' : 'border-white/20'
                  } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                  placeholder="First Name"
                />
                {errors?.firstName && (
                  <p className="text-red-400 text-sm mt-1">{errors.firstName[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                    errors?.lastName ? 'border-red-400' : 'border-white/20'
                  } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Last Name"
                />
                {errors?.lastName && (
                  <p className="text-red-400 text-sm mt-1">{errors.lastName[0]}</p>
                )}
              </div>
            </div>

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

            <div>
              <label htmlFor="retypePassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="retypePassword"
                name="retypePassword"
                value={formValues.retypePassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                  errors?.retypePassword ? 'border-red-400' : 'border-white/20'
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                placeholder="Confirm Password"
              />
              {errors?.retypePassword && (
                <p className="text-red-400 text-sm mt-1">{errors.retypePassword[0]}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
