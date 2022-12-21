import Image from 'next/image';
import styles from './SignIn.module.scss';

const SignInButton = ({ onButtonClick }: { onButtonClick: () => {} }) => {
  return (
    <button
      className={styles.button}
      onClick={() => {
        onButtonClick();
      }}>
      <Image
        className={styles.logo}
        src='/icons/github.svg'
        width='20'
        height='20'
        alt='GitHub logo'
      />
      Log in with GitHub
    </button>
  );
};

export default SignInButton;
