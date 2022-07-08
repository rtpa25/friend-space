import { useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

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
    <div>
      <p>{loginError}</p>
      <form onSubmit={handleSubmit(submitHandler)}>
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

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Login;
