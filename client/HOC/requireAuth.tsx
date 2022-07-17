import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export function requireAuth(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    if (req.headers.cookie) {
      const tokens = req.headers.cookie.split(';');

      const token = tokens?.find((t) => {
        if (t.trim().startsWith('accessToken')) {
          return t;
        }
      });

      if (!token) {
        return {
          redirect: {
            permanent: false,
            destination: '/auth/login',
          },
        };
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/auth/login',
        },
      };
    }
    return await gssp(ctx);
  };
}
