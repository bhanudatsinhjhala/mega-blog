import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/index';
import { authService } from '../services/auth.service';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const registerUser = async (data) => {
    setError('');
    try {
      const session = await authService.signup(data);
      if (session) {
        navigate('/login');
      }
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
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Register your account</h2>
        </div>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(registerUser)} className="space-y-6">
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
            <Input
              label="Name"
              name="name"
              type="text"
              placeholder="John"
              id="name"
              {...register('name', {
                required: true,
              })}
            />

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
            />
            <Input
              label="Confirm Password"
              name="confirm-password"
              type="password"
              placeholder="********"
              autoComplete="password"
              id="password"
              className="px-3 py-1.5 text-base"
              {...register('confirm-password', {
                required: true,
                minLength: 6,
              })}
            />

            <div>
              <Input
                type="submit"
                value="Let's Get Started"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
