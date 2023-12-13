import styles from './index.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Person, Cable, Apps } from '@mui/icons-material';

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goRoute = (link) => {
    navigate(link);
  };

  return (
    <div className={styles.containerSideBar}>
      <h2 className={styles.title}>INTERNSHIP PROJECT</h2>
      <h3 className={styles.subtitle}>RESOURCES</h3>
      <ul className={styles.list}>
        <li
          onClick={() => goRoute('/professionals')}
          className={`${location.pathname === '/professionals' ? styles.marked : ''}`}
        >
          <Person />
          <a>Professionals</a>
        </li>
        <li
          onClick={() => goRoute('/professionals-class')}
          className={`${location.pathname === '/professionals-class' ? styles.marked : ''}`}
        >
          <Apps />
          <a>Professionals Class</a>
        </li>
        <li
          onClick={() => goRoute('/technologies')}
          className={`${location.pathname === '/technologies' ? styles.marked : ''}`}
        >
          <Cable />
          <a>Technologies</a>
        </li>
        <li
          onClick={() => goRoute('/technologies-class')}
          className={`${location.pathname === '/technologies-class' ? styles.marked : ''}`}
        >
          <Apps />
          <a>Technologies Class</a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
