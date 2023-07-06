import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './page/reportWebVitals';
import App from './app';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

reportWebVitals();
