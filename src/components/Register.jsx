import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { register as authRegister, setLoading, setMessage } from '../store/userAuthSlice';
import { Input, Button, LoadingButton } from './index';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthActions } from '../hooks/useAuthActions';

function Register() {
  const { userRegister } = useAuthActions();
  const loading = useSelector((state) => state.userAuth.loading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (userData) => {
    try {
      dispatch(setLoading(true));
      const res = await userRegister(userData).then((res) => res);
      if (res.success) {
        dispatch(setMessage({ error: false, text: res.message }));
        dispatch(authRegister(res.data.user));
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      navigate('/register');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return loading ? (
    <div className="w-screen h-screen flex justify-center items-center p-4">
      <LoadingButton />
    </div>
  ) : (
    <div className="w-screen h-screen flex justify-center items-center p-4">
      <div className="w-120 h-auto dark:bg-secondary bg-orange-200 rounded-lg flex justify-center items-center flex-col p-4 gap-6">
        <h2 className="text-4xl font-bold mt-4 text-shadow-2xs w-full text-center">
          Create Account
        </h2>
        <form
          onSubmit={handleSubmit(submit)}
          className="h-full w-full flex justify-center items-center flex-col gap-4"
        >
          <Input
            placeholder="Username"
            {...register('username', {
              required: 'Username is required',
              pattern: {
                value: /^[^\s]+$/,
                message: 'Username must not contain spaces',
              },
              validate: {
                isLowercase: (value) =>
                  value === value.toLowerCase() || 'Username must be in lowercase',
              },
            })}
            aria-invalid={errors.username ? 'true' : 'false'}
          />
          {errors.username && (
            <p className="text-red-400 text-sm font-bold" role="alert">
              {errors.username.message}
            </p>
          )}
          <Input
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  'Email address must be a valid address',
              },
            })}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className="text-red-400 text-sm font-bold" role="alert">
              {errors.email.message}
            </p>
          )}
          <Input
            placeholder="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && (
            <p className="text-red-400 text-sm font-bold" role="alert">
              {errors.password.message}
            </p>
          )}
          <Button bgColor="bg-primary" type="submit" className="w-30 h-8">
            Register
          </Button>
        </form>
        <p className="font-bold text-center">
          Already have an account?{' '}
          <Link className="underline text-primary" to="/Login">
            Login
          </Link>{' '}
          here.
        </p>
      </div>
    </div>
  );
}

export default Register;
