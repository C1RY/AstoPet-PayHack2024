// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext'; // Import the ThemeProvider

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>  {/* Wrap the entire app with ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
