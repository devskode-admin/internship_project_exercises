import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from '@mui/material';
import CustomizeTheme from './customizeTheme.jsx';
import RoutesConfig from './routes/index.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={CustomizeTheme}>
          <RoutesConfig />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
);
