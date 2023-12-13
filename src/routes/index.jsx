import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home/index.jsx';
import Professionals from '../components/Professionals/index.jsx';
import ProfessionalsClass from '../components/ProfessionalsClass/index.jsx';
import Technologies from '../components/Technologies/index.jsx';
import TechnologiesClass from '../components/TechnologiesClass/index.jsx';

const RoutesConfig = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/professionals" element={<Professionals />} />
      <Route exact path="/technologies" element={<Technologies />} />
      <Route exact path="/technologies-class" element={<TechnologiesClass />} />
      <Route exact path="/professionals-class" element={<ProfessionalsClass />} />
    </Routes>
  );
};
export default RoutesConfig;
