import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ContratoProvider } from './context/contextApp';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import i18n from './componentes/idioma/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ContratoProvider>
        <App></App>
    </ContratoProvider>

 </BrowserRouter>
)
