import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomePage from 'src/pages/Home';
import { CssBaseline } from '@mui/material';
import MainLayout from '../MainLayout';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#920018',
      },
      secondary: {
        main: '#01004c',
      },
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;
