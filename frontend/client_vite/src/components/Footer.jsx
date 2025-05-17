import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto py-4 px-4 w-full bg-black/30 backdrop-blur-sm border-t border-white/20 flex flex-col items-center space-y-2">
      <p className="text-lg font-semibold text-white/80">
        <span className='bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text'>SkillFlex</span> — Web3 Skill Verification Platform
      </p>
      <p className="text-sm text-white/60">
        Built on Solana · Powered by AI
      </p>
      <div className="flex gap-6">
        <a
          href="https://solana.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white underline transition"
        >
          Solana
        </a>
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white underline transition"
        >
          Source Code
        </a>
      </div>
    </footer>
  );
}
