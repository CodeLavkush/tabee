import React, { useEffect, useState } from 'react';
import { Input, Button, LoadingButton } from './index';
import { useForm } from 'react-hook-form';
import { login as authLogin, setLoading, setMessage } from '../store/userAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthActions } from '../hooks/useAuthActions';
import Socket from '../Socket';

function Login() {
  const { login } = useAuthActions();
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
      const res = await login(userData).then((res) => res);

      if (res.success) {
        dispatch(setMessage({ error: false, text: res.message }));
      }

      dispatch(authLogin(res.data));
      Socket.auth = { token: res.data.accessToken };
      Socket.connect();
      navigate('/chats');

      // Uncomment when verification is needed
      // if (res.data.user.isEmailVerified) {
      //   Socket.auth = { token: res.data.accessToken };
      //   Socket.connect();
      //   navigate('/chats');
      // } else {
      //   navigate('/verify-email/:token');
      // }
    } catch (error) {
      console.error(error);
      navigate('/login');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return loading ? (
    <div className="w-screen h-screen flex justify-center items-center p-4">
      <LoadingButton />
    </div>
  ) : (
    <div className="w-screen h-screen flex justify-center items-center p-4 light:text-black">
      <div className="w-120 h-auto dark:bg-secondary bg-orange-200 rounded-lg p-4 flex justify-center items-center flex-col gap-6">
        <h2 className="text-4xl font-bold mt-4 text-shadow-2xs w-full text-center">Login</h2>
        <form
          onSubmit={handleSubmit(submit)}
          className="h-full w-full flex justify-center items-center flex-col gap-4"
        >
          <Input
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
            aria-invalid={errors.username ? 'true' : 'false'}
          />
          {errors.username && (
            <p className="text-red-400 text-sm font-bold" role="alert">
              {errors.username.message}
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
            Login
          </Button>
        </form>
        <p className="font-bold text-center">
          Don't have an account{' '}
          <Link className="underline text-primary" to="/register">
            Register
          </Link>{' '}
          here.
        </p>
      </div>
    </div>
  );
}

export default Login;
