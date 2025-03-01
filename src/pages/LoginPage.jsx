import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/index';
import { authService } from '../services/auth.service';
import { login } from '../store/features/authSlice';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, error: formError } = useForm();
  const [error, setError] = useState(null);

  const loginUser = async (data) => {
    try {
      const userData = await authService.login(data);
      // const userData = {
      //   email: data.email,
      // };
      dispatch(login(userData));
      setTimeout(() => navigate('/'), 500);
    } catch (error) {
      setError(error.message.replace('AppwriteException:', ''));
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(loginUser)} className="space-y-6">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="john@gmail.com"
              autoComplete="email"
              id="email"
              {...register('email', {
                required: true,
                validate: {
                  matchPattern: (value) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(value) || 'Invalid email format';
                  },
                },
              })}
            />

            <div>
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                autoComplete="password"
                id="password"
                className="px-3 py-1.5 text-base"
                {...register('password', {
                  required: true,
                  minLength: 6,
                })}
                childHtml={
                  <div className="text-sm text-right">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                }
              />
            </div>

            <div>
              <Input
                type="submit"
                value="Sign in"
                name="submit"
                bgColor="bg-blur-700"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              />
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
