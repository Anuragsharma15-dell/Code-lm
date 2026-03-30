import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from  './App.tsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.tsx';
import Login from './pages/Login.tsx';
import Signup  from './pages/Signpu.tsx';
import Editor from './pages/Editor.tsx';
// import your components

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Landing/>} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);