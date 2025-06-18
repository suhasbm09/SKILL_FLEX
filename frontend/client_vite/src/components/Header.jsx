import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaInfoCircle,
  FaTimes,
  FaHistory,
  FaSignOutAlt,
  FaWallet,
  FaExternalLinkAlt,
  FaBars,
  FaSearch,
  FaSort
} from 'react-icons/fa';
import { WalletContext } from './WalletContext';
import { challengeDetails } from '../assets/Challenge_Tasks';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const { connectWallet, disconnectWallet, isConnected, walletAddress } = useContext(WalletContext);

  // Fetch history when opened
  useEffect(() => {
    if (historyOpen && walletAddress) {
      fetch(`http://localhost:5000/history/${walletAddress}`)
        .then(r => r.json())
        .then(setRecords)
        .catch(console.error);
    }
  }, [historyOpen, walletAddress]);

  // Filter & sort
  const filtered = useMemo(() => {
    const arr = records
      .filter(r => r.mintPubkey.toLowerCase().includes(filterText.toLowerCase()))
      .sort((a, b) => {
        const ta = new Date(a.timestamp), tb = new Date(b.timestamp);
        return sortOrder === 'newest' ? tb - ta : ta - tb;
      });
    return arr;
  }, [records, filterText, sortOrder]);

  return (
    <>
      {/* Modern glass header */}
      <header className="fixed inset-x-4 top-4 z-50">
        <div className="glass rounded-2xl shadow-2xl border border-white/20">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button
                onClick={() => setSidebarOpen(o => !o)}
                className="text-white/80 hover:text-white text-xl sm:text-2xl transition-all duration-300 hover:scale-110"
                aria-label="Menu"
              >
                <FaBars />
              </button>
              <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
                <img
                  src="/images/SkillFlex_logo.png"
                  alt="SkillFlex Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-xl group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-xl sm:text-2xl font-bold gradient-text">
                  SkillFlex
                </span>
              </Link>
            </div>

            {/* Right: History + Wallet */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isConnected && (
                <button
                  onClick={() => setHistoryOpen(true)}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 glow text-sm sm:text-base"
                >
                  <FaHistory className="text-sm sm:text-base" /> 
                  <span className="hidden sm:inline">History</span>
                </button>
              )}
              <button
                onClick={connectWallet}
                disabled={isConnected}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 text-sm sm:text-base
                  ${isConnected 
                     ? 'bg-green-600/70 cursor-default'
                     : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-purple-500/25 transform hover:scale-105 glow'
                  }
                `}
              >
                <FaWallet className="text-sm sm:text-base" />
                <span className="hidden sm:inline">
                  {isConnected ? 'Connected' : 'Connect Wallet'}
                </span>
                <span className="sm:hidden">
                  {isConnected ? '✓' : 'Connect'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed top-0 left-0 h-full w-72 sm:w-80 z-50 p-6 glass border-r border-white/20 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold gradient-text">Navigation</h2>
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaTimes size={20}/>
              </button>
            </div>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/90 transition-all duration-300 hover:scale-105 group"
              >
                <FaHome className="group-hover:text-purple-400 transition-colors" /> 
                <span className="font-semibold">Home</span>
              </Link>
              <Link
                to="/about"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/90 transition-all duration-300 hover:scale-105 group"
              >
                <FaInfoCircle className="group-hover:text-purple-400 transition-colors" /> 
                <span className="font-semibold">About</span>
              </Link>
              <hr className="border-white/20 my-4"/>
              <button
                onClick={() => { disconnectWallet(); setSidebarOpen(false); }}
                disabled={!isConnected}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600/70 hover:bg-red-700/70 text-white disabled:opacity-50 transition-all duration-300 hover:scale-105 group"
              >
                <FaSignOutAlt className="group-hover:text-red-300 transition-colors" /> 
                <span className="font-semibold">Disconnect</span>
              </button>
            </nav>
          </aside>
        </>
      )}

      {/* Enhanced History Modal */}
      {historyOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={() => setHistoryOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6">
            <div className="w-full max-w-4xl glass rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-auto max-h-[85vh] border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold gradient-text">Mint History</h3>
                <button 
                  onClick={() => setHistoryOpen(false)} 
                  className="text-white/80 hover:text-white text-2xl transition-all duration-300 hover:scale-110"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 text-sm" />
                  <input
                    type="text"
                    placeholder="Filter by mint address…"
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                    className="w-full bg-white/10 placeholder-white/50 text-white px-10 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-white/20"
                  />
                </div>
                <div className="relative">
                  <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 text-sm" />
                  <select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value)}
                    className="bg-white/10 text-white px-10 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-white/20 appearance-none"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>
                </div>
              </div>
              
              {filtered.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-white/60 text-lg">No matching records found.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filtered.map((r, i) => {
                    const detail = challengeDetails[r.challengeId] || {};
                    const symbol = detail.symbol || r.challengeId;
                    const name = detail.name || 'Unknown Challenge';
                    return (
                      <div key={i} className="glass rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/5 transition-all duration-300">
                        <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-purple-400">Challenge:</span>
                              <span className="text-white">{symbol} — {name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-green-400">Score:</span>
                              <span className="text-white">{r.score}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-blue-400">Mint:</span>
                              <span className="text-white font-mono text-sm break-all">{r.mintPubkey}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-400">Time:</span>
                              <span className="text-white text-sm">{new Date(r.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                          <a
                            href={`https://explorer.solana.com/tx/${r.signature}?cluster=devnet`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transform transition-all duration-300 hover:scale-105 glow"
                          >
                            <span>View</span>
                            <FaExternalLinkAlt className="text-sm" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
