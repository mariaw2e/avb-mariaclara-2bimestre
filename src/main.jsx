import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Ajuste o caminho se necessário
import './index.css'; // Se você tiver um CSS global
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext.jsx'; // Importe o Provedor

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider> {/* Envolva a aplicação aqui */}
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>,
);