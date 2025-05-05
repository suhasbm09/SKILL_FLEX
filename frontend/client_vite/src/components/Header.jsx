// src/components/Header.jsx
import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaInfoCircle,
  FaTimes,
  FaHistory,
  FaSignOutAlt
} from 'react-icons/fa';
import { WalletContext } from './WalletContext';
import '../index.css';

export default function Header() {
  const [sidebarOpen, setSidebarOpen]           = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyRecords, setHistoryRecords]     = useState([]);
  const [searchText, setSearchText]             = useState('');
  const [sortOrder, setSortOrder]               = useState('newest'); // or 'oldest'
  const {
    connectWallet,
    disconnectWallet,
    isConnected,
    walletAddress
  } = useContext(WalletContext);

  // Fetch history only when modal opens
  useEffect(() => {
    if (showHistoryModal && walletAddress) {
      fetch(`http://localhost:5000/history/${walletAddress}`)
        .then(r => r.json())
        .then(setHistoryRecords)
        .catch(console.error);
    }
  }, [showHistoryModal, walletAddress]);

  // Filter + sort in memo for performance
  const filtered = useMemo(() => {
    let recs = historyRecords.filter(r =>
      r.mintPubkey.toLowerCase().includes(searchText.toLowerCase())
    );
    recs.sort((a, b) => {
      const ta = new Date(a.timestamp), tb = new Date(b.timestamp);
      return sortOrder === 'newest' ? tb - ta : ta - tb;
    });
    return recs;
  }, [historyRecords, searchText, sortOrder]);

  return (
    <>
      <header className="sticky top-0 flex items-center justify-between px-10 py-5 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800  shadow-xl z-50 backdrop-blur-md">
        {/* Left */}
        <div className="flex items-center space-x-4">
          <button onClick={()=>setSidebarOpen(o=>!o)}
            className="text-2xl text-purple-400 hover:text-purple-500 transition"
          >&#9776;</button>
          <div className='flex items-center space-x-2'>
            {/* Logo */}
            <img
              src="/images/SkillFlex_logo.png"
              alt="SkillFlex Logo"
              className="w-12 h-12 rounded-full shadow-lg"
            />
            <h1 className="text-2xl font-bold sm:text-2xl  tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-400 to-cyan-400">
              SkillFlex
            </h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-4">
          

          {isConnected && (
            <div className='flex flex-row'>
            <button
              onClick={()=>setShowHistoryModal(true)}
              className="text-sm font-bold flex gap-2 px-4 py-1.5 rounded-md  bg-gradient-to-l  from-fuchsia-500 to-purple-500 text-white hover:cursor-pointer transition"
              
            >
              <FaHistory className='text-base'/><span>History</span>
            </button>
            </div>
          )}

          <button
            onClick={connectWallet}
            disabled={isConnected}
            className={`px-4 py-1.5 text-sm hover:cursor-pointer rounded-md shadow-md transition ${
              isConnected
                ? 'bg-green-600 text-gray-600 cursor-default'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={()=>setSidebarOpen(false)}
          />
          <aside className="fixed top-1 left-2  rounded-lg h-screen w-64 bg-gradient-to-br from-black via-gray-900 to-black text-white z-50 shadow-lg p-6 pt-8 backdrop-blur-md border-2 border-gray-600">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-purple-400">Navigation</h2>
              <button onClick={()=>setSidebarOpen(false)} className="text-white hover:text-purple-400">
                <FaTimes />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              <Link to="/" onClick={()=>setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-700 transition"
              ><FaHome className="text-purple-300"/> Home</Link>

              <Link to="/about" onClick={()=>setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-700 transition"
              ><FaInfoCircle className="text-purple-300"/> About</Link>

              <hr className="my-4 border-gray-700"/>

              <button
                onClick={() => { disconnectWallet(); setSidebarOpen(false); }}
                disabled={!isConnected}
                className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition disabled:opacity-50"
              >
                <FaSignOutAlt className="text-red-200"/> Disconnect Wallet
              </button>
            </nav>
          </aside>
        </>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={()=>setShowHistoryModal(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white rounded-2xl shadow-xl w-full max-w-6xl shadow-purple-800 border-2 border-purple-800 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-l from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">Mint History</h3>
                <button
                  onClick={()=>setShowHistoryModal(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >&times;</button>
              </div>

              {/* Search & Sort Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Filter by mint address…"
                  value={searchText}
                  onChange={e=>setSearchText(e.target.value)}
                  className="flex-1 bg-gray-800 placeholder-gray-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={sortOrder}
                  onChange={e=>setSortOrder(e.target.value)}
                  className="bg-gray-800 text-purple-700 px-4 py-2 rounded-lg focus:outline-none mb-2 focus:ring-2 focus:ring-purple-600"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                </select>
              </div>

              {/* Records List */}
              {filtered.length === 0 ? (
                <p className="text-gray-500 text-center">No matching records.</p>
              ) : (
                <ul className="space-y-4 max-h-[60vh] overflow-y-auto">
                  {filtered.map((r,i) => (
                    <li
                      key={i}
                      className="p-4 bg-gray-800 border-2 border-purple-900 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0"
                    >
                      <div className="break-all">
                        <p><span className="font-semibold text-xl text-green-600">Mint:</span> {r.mintPubkey}</p>
                        <p><span className="font-semibold text-xl" >Time:</span> {new Date(r.timestamp).toLocaleString()}</p>
                      </div>
                      <a
                        href={`https://explorer.solana.com/tx/${r.signature}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 sm:mt-0 inline-block px-4 py-2 bg-gradient-to-l from-fuchsia-400 to-purple-500 hover:bg-purple-700 rounded-lg text-sm font-medium transition"
                      >
                        View on Explorer
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
