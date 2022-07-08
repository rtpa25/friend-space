import { useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

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

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const submitHandler = async (values: CreateUserInput) => {
    try {
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
  };

  return (
    <div>
      <p>{registerError}</p>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='form-element'>
          <label htmlFor='name'>Name</label>
          <input id='name' type='text' placeholder='rp' {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            placeholder='rp@rp.io'
            {...register('email')}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            placeholder='*****'
            {...register('password')}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor='passwordConfirmation'>Confirm Password</label>
          <input
            id='passwordConfirmation'
            type='password'
            placeholder='*****'
            {...register('passwordConfirmation')}
          />
          {errors.passwordConfirmation && (
            <p>{errors.passwordConfirmation.message}</p>
          )}
        </div>

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Register;
