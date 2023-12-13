import { configureStore } from '@reduxjs/toolkit';
import technologyReducer from './technologySlice';
import professionalReducer from './professionalSlice';

export const store = configureStore({
  reducer: {
    technologies: technologyReducer,
    professionals: professionalReducer,
  },
});
