import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
// import App from './App';
import StampDetail from './stampDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StampDetail/>
  </React.StrictMode>
=======
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/globalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>
>>>>>>> 039a1254fca603a3bc4882ea5fe9b79e3c8960cc
);
