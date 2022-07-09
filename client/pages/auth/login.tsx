import { useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const createSessionSchema = object({
  email: string({
    required_error: 'email is required',
  }).email('invalid email'),
  password: string({
    required_error: 'password is required',
  }),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

const Login = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  const submitHandler = async (values: CreateSessionInput) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        values,
        { withCredentials: true }
      );
      router.push('/');
    } catch (e: any) {
      setLoginError(e.message);
    }
  };

  return (
    <div className='auth-background'>
      <div className='auth-container'>
        <div className='auth-header-container'>
          <h1 className='auth-header-main-heading'>Welcome Back!</h1>
          <h4 className='auth-header-sub-heading'>
            We're so excited to see you again!
          </h4>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className='auth-form'>
          <div className='auth-input-element-container'>
            <label htmlFor='email' className='auth-input-label'>
              Email Adress
            </label>
            <input
              id='email'
              type='email'
              placeholder='ronit@gmail.com'
              {...register('email')}
              className='auth-input-bar'
            />
            {errors.email && (
              <p className='auth-input-error'>{errors.email.message}</p>
            )}
          </div>

          <div className='auth-input-element-container'>
            <label htmlFor='password' className='auth-input-label'>
              Password
            </label>
            <input
              id='password'
              type='password'
              placeholder='**********'
              className='auth-input-bar'
              {...register('password')}
            />
            {errors.password && (
              <p className='auth-input-error'>{errors.password.message}</p>
            )}
          </div>

          <button type='submit' className='auth-button-primary'>
            Login
          </button>
        </form>
        <Link href={'/auth/register'}>
          <div className='auth-redirect-link-div'>
            Need an account?{' '}
            <span className='auth-redirect-link-span '>Register</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
