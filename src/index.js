import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated to use `react-dom/client` for React 18
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// React 18 uses the createRoot API
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional performance monitoring
reportWebVitals();
