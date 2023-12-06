/* eslint-disable import/no-unresolved */
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';

const RoutesConfig = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
    </Routes>
  );
};
export default RoutesConfig;
