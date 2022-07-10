import { useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const createUserSchema = object({
  name: string({
    required_error: 'name is required',
  }).min(1),
  password: string({
    required_error: 'password is required',
  }).min(6, 'password too short - should be more than 6 chars'),
  passwordConfirmation: string({
    required_error: 'password confirmation is rquired',
  }),
  email: string({
    required_error: 'email is required',
  }).email('not a valid email'),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'passwords do not match',
  path: ['passwordConfirmation'],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

const Register = () => {
  const router = useRouter();
  const [registerError, setRegisterError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const submitHandler = async (values: CreateUserInput) => {
    try {
      setLoading(true);
      //create the user
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
        values
      );
      //create the session for same
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        { email: values.email, password: values.password },
        { withCredentials: true }
      );
      router.push('/');
    } catch (error: any) {
      setRegisterError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className='auth-background'>
      <div className='auth-container'>
        <div className='auth-header-container'>
          <h1 className='auth-header-main-heading'>Create an account</h1>
          {registerError ? (
            <p className='auth-input-error'>{registerError}</p>
          ) : (
            <h4 className='auth-header-sub-heading'>
              We're so excited to see you!
            </h4>
          )}
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className='auth-form'>
          <div className='auth-input-element-container'>
            <label htmlFor='name' className='auth-input-label'>
              Username
            </label>
            <input
              id='name'
              type='text'
              placeholder='Ronit Panda'
              className='auth-input-bar'
              {...register('name')}
            />
            {errors.name && (
              <p className='auth-input-error'>{errors.name.message}</p>
            )}
          </div>
          <div className='auth-input-element-container'>
            <label htmlFor='email' className='auth-input-label'>
              Email Adress
            </label>
            <input
              id='email'
              type='email'
              placeholder='ronit@gmail.com'
              className='auth-input-bar'
              {...register('email')}
            />
            {errors.email && (
              <p className='auth-input-error'>{errors.email.message}</p>
            )}
          </div>

          <div className='auth-input-element-container mb-0'>
            <label htmlFor='password' className='auth-input-label'>
              Password
            </label>
            <input
              id='password'
              type={`${isPasswordVisible ? 'text' : 'password'}`}
              placeholder='**********'
              className='auth-input-bar'
              {...register('password')}
            />
            <div
              className='text-green-500 cursor-pointer relative bottom-8 left-full w-auto'
              onClick={() => {
                setIsPasswordVisible((prevState) => !prevState);
              }}>
              {isPasswordVisible ? (
                <VisibilityOff className='relative right-10 bottom-1' />
              ) : (
                <Visibility className='relative right-10 bottom-1' />
              )}
            </div>
            {errors.password && (
              <p className='auth-input-error'>{errors.password.message}</p>
            )}
          </div>

          <div className='auth-input-element-container mb-0'>
            <label htmlFor='passwordConfirmation' className='auth-input-label'>
              Confirm Password
            </label>
            <input
              id='passwordConfirmation'
              type={`${isConfirmPasswordVisible ? 'text' : 'password'}`}
              placeholder='**********'
              className='auth-input-bar'
              {...register('passwordConfirmation')}
            />
            <div
              className='text-green-500 cursor-pointer relative bottom-8 left-full w-auto'
              onClick={() => {
                setIsConfirmPasswordVisible((prevState) => !prevState);
              }}>
              {isConfirmPasswordVisible ? (
                <VisibilityOff className='relative right-10 bottom-1' />
              ) : (
                <Visibility className='relative right-10 bottom-1' />
              )}
            </div>
            {errors.passwordConfirmation && (
              <p className='auth-input-error'>
                {errors.passwordConfirmation.message}
              </p>
            )}
          </div>

          <button type='submit' className='auth-button-primary'>
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>
        <Link href={'/auth/login'}>
          <div className='auth-redirect-link-div'>
            Already have an account?{' '}
            <span className='auth-redirect-link-span '>Login</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Register;
