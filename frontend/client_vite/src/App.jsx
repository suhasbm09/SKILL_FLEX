// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Challenge from './pages/Challenge';
import Result from './pages/Result';
import About from './pages/About';
// import Settings from './pages/Settings';
import './index.css'; 
// import History from './pages/History';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, // animation happens only once per scroll
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="/history" element={<History />} /> */}
        <Route path="challenge/:id" element={<Challenge />} />
        <Route path="result" element={<Result />} />
        <Route path="about" element={<About />} />
        {/* <Route path="settings" element={<Settings />} /> */}
      </Route>
    </Routes>
  );
}

export default App;