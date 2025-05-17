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
      {/* Floating glass header */}
      <header className="fixed inset-x-4 top-4 z-50 flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setSidebarOpen(o => !o)}
            className="text-white/80 hover:text-white text-2xl transition"
            aria-label="Menu"
          >
            &#9776;
          </button>
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/images/SkillFlex_logo.png"
              alt="SkillFlex Logo"
              className="w-10 h-10 rounded-full shadow-xl"
            />
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              SkillFlex
            </span>
          </Link>
        </div>

        {/* Right: History + Wallet */}
        <div className="flex items-center space-x-4">
          {isConnected && (
            <button
              onClick={() => setHistoryOpen(true)}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-gradient-to-tr from-pink-600 to-purple-600 text-white rounded-xl shadow-md hover:opacity-90 transition"
            >
              <FaHistory /> History
            </button>
          )}
          <button
            onClick={connectWallet}
            disabled={isConnected}
            className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-xl text-white font-semibold shadow-md transition
              ${isConnected 
                 ? 'bg-green-600/70 cursor-default'
                 : 'bg-purple-600 hover:bg-purple-700'}
            `}
          >
            <FaWallet />
            {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
          </button>
        </div>
      </header>

      {/* Sidebar nav */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed top-0 left-0 h-full w-72 z-50 p-6 bg-white/10 backdrop-blur-lg border-r border-white/20 space-y-6 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white/90">Navigation</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-white/80 cursor-pointer hover:text-white">
                <FaTimes size={20}/>
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-700/30 text-white/90 transition"
              >
                <FaHome /> Home
              </Link>
              <Link
                to="/about"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-700/30 text-white/90 transition"
              >
                <FaInfoCircle /> About
              </Link>
              <hr className="border-white/20"/>
              <button
                onClick={() => { disconnectWallet(); setSidebarOpen(false); }}
                disabled={!isConnected}
                className="flex items-center cursor-pointer gap-2 px-3 py-2 rounded-lg bg-red-600/70 hover:bg-red-700/70 text-white disabled:opacity-50 transition"
              >
                <FaSignOutAlt /> Disconnect
              </button>
            </nav>
          </aside>
        </>
      )}

      {/* History Modal */}
      {historyOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setHistoryOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
            <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-white shadow-2xl overflow-auto max-h-[80vh]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Mint History</h3>
                <button onClick={() => setHistoryOpen(false)} className=" cursor-pointer text-white/80 hover:text-white text-2xl">
                  &times;
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Filter by mint address…"
                  value={filterText}
                  onChange={e => setFilterText(e.target.value)}
                  className="flex-1 bg-white/20 placeholder-white/50 text-white px-4 py-2 rounded-lg focus:outline-none"
                />
                <select
                  value={sortOrder}
                  onChange={e => setSortOrder(e.target.value)}
                  className="bg-white/20 text-white px-4 py-2 rounded-lg focus:outline-none"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                </select>
              </div>
              {filtered.length === 0 ? (
                <p className="text-center text-white/60">No matching records.</p>
              ) : (
                <ul className="space-y-4">
                {filtered.map((r,i) => {
                  const detail = challengeDetails[r.challengeId] || {};
                  const symbol = detail.symbol || r.challengeId;
                  const name   = detail.name   || 'Unknown Challenge';
                  return (
                    <li key={i} className="p-4 bg-white/10 border border-white/20 rounded-xl flex flex-col sm:flex-row sm:justify-between">
                      <div className="break-all space-y-1">
                  
                        <p>
                          <span className="font-semibold text-green-400">Challenge:</span>
                          {' '}{symbol} — {name}
                        </p>
                        <p>
                          <span className="font-semibold text-red-600">Score:</span>
                          {' '}{r.score}%
                        </p>
                        <p>
                          <span className="font-semibold text-green-400">Mint:</span> {r.mintPubkey}
                          </p>
                        <p>
                          <span className="font-semibold">Time:</span>
                          {' '}{new Date(r.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <a
                        href={`https://explorer.solana.com/tx/${r.signature}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="    inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-br from-indigo-500/70 via-purple-500/70 to-pink-500/70  text-white font-semibold rounded-lg shadow-lg shadow-pink-500/30 transform transition duration-300 ease-out hover:scale-110 hover:shadow-purple-500/40 focus:outline-none focus:ring-4 focus:ring-purple-300/50"
                      >
                        <FaExternalLinkAlt className="w-4 h-4 mr-2" />
                        View on Explorer
                      </a>
                    </li>
                  )
              })}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
