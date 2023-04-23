import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Rotas />
  </BrowserRouter>,
)