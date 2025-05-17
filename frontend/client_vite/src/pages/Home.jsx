import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WalletContext } from '../components/WalletContext';
import { FaKeyboard, FaRobot, FaCube } from 'react-icons/fa';

const challengeSteps = [
  { icon: <FaKeyboard />, title: 'Complete Challenge' },
  { icon: <FaRobot />, title: 'AI Evaluates' },
  { icon: <FaCube />,  title: 'Mint NFT' }
];

const skills = [
  { id: 1, title: 'Algorithmic Problem Solving in JavaScript' },
  { id: 2, title: 'Query & Model Data with MongoDB' },
  { id: 3, title: 'Full-Stack App Deployment on AWS ECS' },
  { id: 4, title: 'Software Delivery with Docker' },
  { id: 5, title: 'Smart Contract Dev on Solana' }
];

export default function Home() {
  const { walletAddress } = useContext(WalletContext);

  return (
    <div className="relative z-10 min-h-screen flex flex-col backdrop-blur-sm bg-black/20 items-center px-6 py-20">
      {/* Hero */}
      <h1 className="text-5xl mt-10 sm:text-6xl font-extrabold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
        Turn Your Skill Into Proof.
      </h1>

      {/* Steps */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl mb-20">
        {challengeSteps.map(({ icon, title }, i) => (
          <div
            key={i}
            className="flex flex-col items-center p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl hover:scale-105 hover:shadow-2xl transition"
          >
            <div className="text-5xl text-purple-400 mb-4">{icon}</div>
            <h3 className="text-xl text-white font-semibold">{title}</h3>
          </div>
        ))}
      </section>

      {/* Wallet Status */}
      <div
        className={`w-full max-w-lg text-center mb-16 py-3 rounded-lg ${
          walletAddress ? 'bg-green-600/70' : 'bg-red-600/70'
        } text-white font-semibold`}
      >
        {walletAddress
          ? `Connected: ${walletAddress}`
          : 'Phantom wallet not connected'}
      </div>

      {/* Skills (full-width glass cards) */}
      <section className="w-full  space-y-6">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          SKILLS
        </h2>
        <div className="space-y-4">
          {skills.map(({ id, title }) => (
            <div
              key={id}
              className="flex items-center justify-between px-6 py-5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl hover:bg-white/20 hover:shadow-xl transition"
            >
              <span className="text-xl text-white font-semibold">
                {id}. {title}
              </span>
              <Link
                to={`/challenge/${id}`}
                className="px-6 py-3 bg-gradient-to-tr from-pink-600/80 to-purple-600/80 text-white font-semibold rounded-xl shadow-md hover:scale-105 transform transition"
              >
                Start Challenge
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
