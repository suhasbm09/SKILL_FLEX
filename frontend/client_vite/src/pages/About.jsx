// About.jsx
import React, { useState } from 'react';
import '../index.css';

export default function About() {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-6 py-12">
      
      {/* Animated card */}
      <div className="relative max-w-3xl w-full text-center bg-gray-800 bg-opacity-70 p-10 rounded-3xl shadow-2xl border border-purple-700 overflow-hidden
      animate-fadeInUp">
        
        {/* Purple blur glow */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-purple-900 opacity-10 blur-[150px] rounded-full z-0" />
        
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold mb-6 text-purple-400 tracking-wide drop-shadow-lg">
            About Me
          </h1>

          <p className="text-lg mb-6 leading-relaxed text-gray-300">
            Hello! I'm <span className="text-white font-semibold">Suhas B M</span>, currently pursuing my 3rd year in Computer Science and Engineering at NIE, Mysuru, India.
            I'm deeply fascinated by how thoughtfully engineered software solutions can address real-world challenges. 
            The idea that a well-crafted application can drive meaningful impact genuinely excites me and fuels my passion for 
            <span className="text-purple-300 font-medium"> Blockchain Development</span>, 
            <span className="text-purple-300 font-medium"> Artificial Intelligence</span>, and 
            <span className="text-purple-300 font-medium"> Full-Stack Engineering</span>.
          </p>

          <p className="text-lg mb-8 leading-relaxed text-gray-300">
            This project — built during the <span className="text-white font-semibold">Solana Outbreak Hackathon</span> — reimagines
            how <span className="text-purple-300 font-medium">Skill Credentials</span> are verified. 
            Instead of paper certificates, skills are now minted as NFTs on Solana, creating a 
            <span className="text-purple-300 font-medium"> decentralized, immutable proof of talent.</span> 
          </p>

          <h2
            className="cursor-pointer text-2xl font-semibold text-purple-500 mb-4 transition-transform hover:scale-105"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            {showInstructions ? '▲ How to use this app' : '▼ How to use this app'}
          </h2>

          {showInstructions && (
            <ul className="text-left animate-fadelf text-gray-300 list-disc pl-6 space-y-3 text-base transition-opacity duration-500">
              <li>Start from the Home page and select a Challenge.</li>
              <li>Submit your answer and let the AI evaluate your skills.</li>
              <li>If you pass, connect your Phantom wallet on Solana Devnet.</li>
              <li>Mint your Skill Credential NFT and own your proof forever!</li>
              <li>View your NFT inside your Phantom wallet.</li>
            </ul>
          )}

          <div className="mt-10 text-sm text-gray-500 italic">
            Building the future, one skill at a time.
          </div>
        </div>
      </div>
    </div>
  );
}