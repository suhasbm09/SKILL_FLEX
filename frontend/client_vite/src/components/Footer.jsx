import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full mt-auto">
      <div className="glass border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <img
                  src="/images/SkillFlex_logo.png"
                  alt="SkillFlex Logo"
                  className="w-10 h-10 rounded-full shadow-lg"
                />
                <span className="text-2xl font-bold gradient-text">SkillFlex</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Turn your skills into verifiable proof on the blockchain. 
                Complete AI-evaluated challenges and mint soulbound NFTs.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a 
                  href="#challenges" 
                  className="block text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Available Challenges
                </a>
                <a 
                  href="#how-it-works" 
                  className="block text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  How It Works
                </a>
                <a 
                  href="#features" 
                  className="block text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Features
                </a>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-4">Built With</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Solana Blockchain</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">AI-Powered Evaluation</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">React & TailwindCSS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-white/20 mb-6" />

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-400">
                © 2025 <span className="gradient-text font-semibold">SkillFlex</span>. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Built on Solana · Powered by AI
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/suhasbm09/SKILL_FLEX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 glass rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <FaGithub className="text-gray-300 group-hover:text-white transition-colors" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">GitHub</span>
                <FaExternalLinkAlt className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors" />
              </a>
              
              <a
                href="https://solana.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 glass rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-purple-400 rounded"></div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Solana</span>
                <FaExternalLinkAlt className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
