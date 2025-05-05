import React from 'react';
import '../index.css';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-black via-black to-gray-900 text-white py-6 px-4 text-center border-t border-gray-800">
      <p className="text-sm md:text-base font-light tracking-wide">
         {new Date().getFullYear()}
        <span className="mx-1 font-['Rajdhani'] text-purple-400">Solana Outbreak Hackathon</span> |
        <span className="ml-1 bg-clip-text font-['orbitron'] text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-400 to-cyan-400"> SkillFlex</span> by<span className="ml-1  text-green-400">SUHAS B M</span>
      </p>
    </footer>
  );
}