import { createTheme } from '@mui/material';

const CustomizeTheme = createTheme({
  palette: {
    primary: {
      main: '#656ed3',
      contrastText: '#fff',
    },
    secondary: {
      main: '#777777',
      contrastText: '#fff',
    },
    info: {
      main: '#AFB3FF',
      contrastText: '#fff',
    },
  },
  components: {},
});

export default CustomizeTheme;
