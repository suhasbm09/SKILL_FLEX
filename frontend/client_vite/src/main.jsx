// main.jsx
import { Buffer } from 'buffer';
window.Buffer = Buffer;   // makes Buffer globally available
//           Buffer.from('metadata'),
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { WalletProvider } from './components/WalletContext';  // Correct path for WalletContext


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <App />
      </WalletProvider>
    </BrowserRouter>
  </React.StrictMode>
);