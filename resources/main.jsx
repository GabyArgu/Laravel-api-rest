import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Donde defines las rutas React
import './css/app.css';      // Tailwind y estilos

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
