import { redirect } from 'next/navigation'

import Box from 'app/common/Box'
import { fetchUser } from 'services/api/users'
import { UserProps } from 'types/User'

import SignInButton from './Button'
import styles from './SignIn.module.scss'

const getUser = () => fetchUser()

const SignIn = async () => {
  const user: UserProps = await getUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className={styles.signin}>
      <Box className={styles.box}>
        <h1>Welcome back!</h1>
        <p className={styles.description}>
          To continue, please authenticate using your GitHub account.
        </p>

        <SignInButton />
      </Box>
    </div>
  )
}

export default SignIn
