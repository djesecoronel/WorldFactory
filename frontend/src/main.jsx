import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '/src/App.jsx'; // Esto importa tu componente raíz
import './index.css';       // Esto importa los estilos

// Aquí le decimos a React: "Busca el div con id='root' en index.html y dibuja todo dentro"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);