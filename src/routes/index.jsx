import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home/index.jsx';
import Professionals from '../components/Professionals/index.jsx';
import Technologies from '../components/Technologies/index.jsx';

const RoutesConfig = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/human-resources" element={<Professionals />} />
      <Route exact path="/technologies" element={<Technologies />} />
    </Routes>
  );
};
export default RoutesConfig;
