import { configureStore } from '@reduxjs/toolkit';
import professionalReducer from './professionalSlice';
import technologyReducer from './technologySlice';

export const store = configureStore({
  reducer: {
    professionals: professionalReducer,
    technologies: technologyReducer,
  },
});
