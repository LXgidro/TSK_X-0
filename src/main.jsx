import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Game from './Game/Game.jsx';
import RegForm from './RegField/RegForm.jsx';
import RegForm_RHF from './RegField/Reg RHF-Yup/main.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Game /> */}
    <RegForm />
    {/* <RegForm_RHF /> */}
  </StrictMode>
);
