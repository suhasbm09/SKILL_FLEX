import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaRocket,
  FaCode,
  FaDatabase,
  FaDocker,
  FaLink,
  FaBolt,
  FaTrophy,
  FaShieldAlt,
  FaGlobe,
  FaArrowRight,
  FaPlay,
  FaHeart
} from 'react-icons/fa';

const techStack = [
  { icon: <FaCode className="text-blue-400" />, name: 'React & TypeScript' },
  { icon: <FaDatabase className="text-green-400" />, name: 'MongoDB Atlas' },
  { icon: <FaDocker className="text-blue-300" />, name: 'Docker' },
  { icon: <FaLink className="text-purple-400" />, name: 'Solana & Anchor' },
  { icon: <FaBolt className="text-yellow-400" />, name: 'OpenRouter AI' }
];

const features = [
  {
    icon: <FaRocket />, title: 'Instant AI Evaluation',
    description: 'Get real-time feedback on your submissions with advanced AI scoring.'
  },
  {
    icon: <FaShieldAlt />, title: 'Soulbound NFTs',
    description: 'Non-transferable credentials that prove your skills on the blockchain.'
  },
  {
    icon: <FaGlobe />, title: 'Decentralized',
    description: 'Built on Solana for transparency and immutability.'
  },
  {
    icon: <FaTrophy />, title: 'Verified Skills',
    description: 'Share your achievements and build a blockchain-powered portfolio.'
  }
];

const howItWorks = [
  {
    step: 1,
    title: 'Choose & Complete',
    description: 'Select a challenge and submit your solution.',
    icon: <FaCode />
  },
  {
    step: 2,
    title: 'AI Evaluation',
    description: 'Our AI analyzes your submission and provides instant feedback.',
    icon: <FaBolt />
  },
  {
    step: 3,
    title: 'Mint Credential',
    description: 'If you pass, mint your soulbound NFT credential on Solana.',
    icon: <FaTrophy />
  }
];

export default function About() {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="max-w-4xl w-full text-center mt-32 mb-20 animate-fade-in-up">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 gradient-text animate-fade-in-up">About SkillFlex</h1>
        <p className="text-xl sm:text-2xl text-gray-300 mb-8 animate-fade-in-up delay-150">
          Revolutionizing skill verification through AI-powered challenges and blockchain credentials.
        </p>
        <div className="flex justify-center gap-4 mb-2 animate-fade-in-up delay-300">
          <a href="https://github.com/suhasbm09/SKILL_FLEX" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-2xl transition-colors">
            <FaGithub />
          </a>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-3xl w-full text-center mb-20 animate-fade-in-up delay-200">
        <div className="inline-flex items-center gap-3 mb-4">
          <FaHeart className="text-pink-400 animate-pulse" />
          <span className="text-lg text-gray-300">Built with passion for the future of credentialing</span>
          <FaHeart className="text-pink-400 animate-pulse" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Our Mission</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          SkillFlex empowers you to prove your skills with immutable, AI-evaluated credentials on the Solana blockchain. No more paper certificates—just verifiable, soulbound proof of your abilities.
        </p>
      </section>

      {/* Features Grid */}
      <section className="max-w-5xl w-full mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 gradient-text animate-fade-in-up">Why SkillFlex?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-8 text-center flex flex-col items-center justify-center hover:scale-105 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="text-4xl mb-4 text-purple-400 animate-float">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300 text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-4xl w-full mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 gradient-text animate-fade-in-up">Built With Modern Tech</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {techStack.map((tech, i) => (
            <div
              key={i}
              className="flex flex-col items-center group animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{tech.icon}</div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors text-center w-28">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl w-full mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 gradient-text animate-fade-in-up">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorks.map((step, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-8 text-center flex flex-col items-center hover:scale-105 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-2xl font-bold mb-4 animate-float">
                {step.step}
              </div>
              <div className="text-3xl mb-3 text-purple-400">{step.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-300 text-base">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Signature Section */}
      <section className="max-w-xl w-full mb-24 animate-fade-in-up delay-300">
        <div className="glass rounded-3xl p-8 text-center border border-white/20 shadow-xl">
          <img
            src="/images/SkillFlex_logo.png"
            alt="Suhas B M"
            className="w-16 h-16 rounded-full mx-auto mb-4 shadow-lg"
          />
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-1 gradient-text">Suhas B M</h2>
          <h3 className="text-base text-purple-300 font-semibold mb-3">Founder & Full-Stack Blockchain Developer</h3>
          <p className="text-base text-gray-300 mb-4 leading-relaxed">
            Hi! I'm <span className="text-white font-bold">Suhas B M</span>, a 3rd-year Computer Science student at NIE, Mysuru. I'm passionate about building real-world solutions with <span className="text-purple-300 font-medium">Blockchain</span>, <span className="text-purple-300 font-medium">AI</span>, and <span className="text-purple-300 font-medium">Full-Stack Engineering</span>.<br/>
            SkillFlex is my hackathon entry for the <span className="text-white font-semibold">Solana Outbreak Hackathon</span>—reinventing credentialing with decentralized, immutable proof of skill.
          </p>
          <div className="flex justify-center gap-4 mb-2">
            <a href="https://github.com/suhasbm09" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-2xl"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/suhas-b-m-88a179244" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white text-2xl"><FaExternalLinkAlt /></a>
            <a href="mailto:suhaasbm2004@gmail.com" className="text-pink-400 hover:text-white text-2xl"><FaExternalLinkAlt /></a>
          </div>
          <div className="flex justify-center mt-4">
            <a
              href="https://portfolio-suhasbm.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
            >
              Portfolio
              <FaExternalLinkAlt className="ml-1 text-base" />
            </a>
          </div>
          <p className="text-xs text-gray-400 italic mt-2">Building the future, one skill at a time.</p>
        </div>
      </section>
    </div>
  );
}