// App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';

// Layout and Pages
import Layout from './components/Layout';
import Home from './pages/Home';
import Challenge from './pages/Challenge';
import Result from './pages/Result';
import About from './pages/About';


function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
        <Route index element={<Home />} />
        <Route path="challenge/:id" element={<Challenge />} />
        <Route path="result" element={<Result />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
