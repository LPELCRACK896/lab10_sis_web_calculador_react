import React from 'react'
import { createRoot } from 'react-dom/client'
import './style/main.scss'
import BtnNumero from './components/boton_numero/BtnNumero.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
function App() {
  return (
    <div>
      <BtnNumero />
    </div>
  );
}
root.render(<App />);
