import { unstable_getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

import Box from 'app/common/Box';
import SignInButton from './SignInButton';
import styles from './SignIn.module.scss';

const SignIn = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await unstable_getServerSession();

  if (session) {
    redirect('/');
  }

  return (
    <div className={styles.signin}>
      <Box className={styles.box}>
        <h1>Welcome back!</h1>
        <p className={styles.description}>
          To continue, please authenticate using your GitHub account.
        </p>
        <SignInButton />
        {searchParams?.error && (
          <p className={styles.error}>
            Unable to authenticate, please try again!
          </p>
        )}
      </Box>
    </div>
  );
};

export default SignIn;
