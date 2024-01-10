import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Professionals from '../components/Professionals';
import Technologies from '../components/Technologies';

const RoutesConfig = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/professionals" element={<Professionals />} />
      <Route exact path="/technologies" element={<Technologies />} />
    </Routes>
  );
};
export default RoutesConfig;
