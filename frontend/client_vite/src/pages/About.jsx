import React, { useState } from 'react';
import '../index.css';

export default function About() {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
  <div className="relative min-h-screen flex items-center justify-center bg-black/70 backdrop-blur-lg overflow-hidden">
    {/* Layered Glow Orbs */}
    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-700 opacity-20 blur-[200px] rounded-full animate-fade-in"></div>
    <div className="absolute top-[20%] right-[-20%] w-[500px] h-[500px] bg-cyan-700 opacity-15 blur-[180px] rounded-full animate-fade-in delay-200"></div>

    {/* Glass Card */}
    <div className="relative z-10 w-full max-w-2xl p-12 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl">
      <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 drop-shadow-lg">
        About Me
      </h1>

      <p className="text-lg mb-4 text-gray-200 leading-relaxed">
        Hey there! I’m <span className="text-white font-semibold">Suhas B M</span>, a 3rd-year Computer Science student at NIE, Mysuru. I thrive on building real-world solutions with
        <span className="text-purple-300 font-medium"> Blockchain</span>,
        <span className="text-purple-300 font-medium"> AI</span>, and
        <span className="text-purple-300 font-medium"> Full-Stack Engineering</span>.
      </p>

      <p className="text-lg mb-8 text-gray-200 leading-relaxed">
        This hackathon entry—crafted for the <span className="text-white font-semibold">Solana Outbreak Hackathon</span>—reinvents credentialing. Instead of paper, every skill you master becomes an NFT on Solana, granting
        <span className="text-purple-300 font-medium"> decentralized, immutable proof</span> of ability.
      </p>

      {/* Toggle */}
      <button
        onClick={() => setShowInstructions(s => !s)}
        className="flex items-center justify-center w-full text-xl mb-4 text-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl py-3 transition-transform hover:scale-105"
      >
        {showInstructions ? '▲ Hide Usage Tips' : '▼ Show Usage Tips'}
      </button>

      {showInstructions && (
        <ul className="text-left text-gray-200 list-disc pl-6 space-y-2 animate-fade-in">
          <li>Choose a Challenge on the Home screen.</li>
          <li>Submit your answer and let the AI grade it.</li>
          <li>Connect your Phantom wallet (Solana Devnet) if you pass.</li>
          <li>Mint your credential NFT and see it in your wallet.</li>
        </ul>
      )}

      <p className="mt-10 text-sm text-gray-400 italic text-center">
        Building the future, one skill at a time.
      </p>
    </div>
  </div>
);

}