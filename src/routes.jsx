import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import Cadastro from './Cadastro'

function Rotas() {
  return (
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path="/cadastro" element={<Cadastro/>} />
    </Routes>
  );
}

export default Rotas;
