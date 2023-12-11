import { Button } from '@mui/material';
import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Button variant="contained" size="large" href="/technologies">
        Home section
      </Button>
    </div>
  );
};

export default Home;
