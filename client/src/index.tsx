import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {ThemeProvider, createTheme}  from "@mui/material"
import {disableReactDevTools} from "@fvilers/disable-react-devtools"

// if(process.env.NODE_ENV === "production") disableReactDevTools()

const container = document.getElementById('root')!;
const root = createRoot(container);

const theme = createTheme({
  palette: {
    // type: 'light',
    primary: {
      main: '#8AAA79',
    },
    secondary: {
      main: '#b8bdb4',
    }
  },
})


root.render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
    </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
