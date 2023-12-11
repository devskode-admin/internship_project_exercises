import styles from './index.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Person, Cable } from '@mui/icons-material';

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goRoute = (link) => {
    navigate(link);
  };

  return (
    <div className={styles.containerSideBar}>
      <h2 className={styles.title}>INTERNSHIP PROJECT</h2>
      <h3 className={styles.subtitle}>HUMAN RESOURCES</h3>
      <ul className={styles.list}>
        <li
          onClick={() => goRoute('/human-resources')}
          className={`${location.pathname === '/human-resources' ? styles.marked : ''}`}
        >
          <Person />
          <a>Professionals</a>
        </li>
        <li
          onClick={() => goRoute('/technologies')}
          className={`${location.pathname === '/technologies' ? styles.marked : ''}`}
        >
          <Cable />
          <a>Technologies</a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
