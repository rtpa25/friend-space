import { FC } from 'react';

interface ErrorCaseProps {
  error: string;
}

const ErrorCase: FC<ErrorCaseProps> = ({ error }) => {
  return (
    <div className='text-red-500 text-center'>
      <span>{error}</span>
    </div>
  );
};

export default ErrorCase;
