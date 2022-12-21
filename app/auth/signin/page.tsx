'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import Box from 'app/common/Box';
import SignInButton from './SignInButton';
import styles from './SignIn.module.scss';
import Loading from './loading';

const SignIn = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  if (session) {
    redirect('/');
  }

  const onButtonClick = () => {
    signIn('github');
    setLoading(true);
  };

  return (
    <div className={styles.signin}>
      <Box className={styles.box}>
        <h1>Welcome back!</h1>
        <p className={styles.description}>
          To continue, please authenticate using your GitHub account.
        </p>

        {loading ? (
          <Loading />
        ) : (
          <SignInButton onButtonClick={async () => onButtonClick()} />
        )}

        {searchParams?.error && !loading && (
          <p className={styles.error}>
            Unable to authenticate, please try again!
          </p>
        )}
      </Box>
    </div>
  );
};

export default SignIn;
