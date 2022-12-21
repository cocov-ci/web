import { RefreshCw } from 'lucide-react';
import styles from './SignIn.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <RefreshCw className={styles.spinner} />
    </div>
  );
};

export default Loading;
