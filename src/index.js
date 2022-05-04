import React from 'react'
import { createRoot } from 'react-dom/client'
import './style/main.scss'
import Calculadora from './components/calculadora/Calculadora.jsx'

const container = document.getElementById('root');
const root = createRoot(container);
function App() {
  return (
    <div id="index-main-wrapper">
      <Calculadora />
    </div>
  );
}
root.render(<App />);
