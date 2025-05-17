import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { WalletContext } from '../components/WalletContext';
import '../index.css';
import { challengeDetails } from '../assets/Challenge_Tasks';

export default function Challenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { walletAddress } = useContext(WalletContext);

  const [mode, setMode] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [file, setFile] = useState(null);
  const [evalState, setEvalState] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const detail = challengeDetails[id];
  if (!detail) return <p className="p-6 text-red-400">Challenge not found.</p>;

  const handleSubmit = async () => {
    setErrorMsg('');
    let submission = '';

    if (mode === 'file') {
      if (!file) return setErrorMsg('Please upload a file to submit.');
      submission = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result.toString());
        reader.onerror = () => rej();
        reader.readAsText(file);
      });
    } else if (mode === 'code') {
      if (!codeInput.trim()) return setErrorMsg('Please enter your code before submitting.');
      submission = codeInput;
    } else {
      if (!textInput.trim()) return setErrorMsg('Please type your answer before submitting.');
      submission = textInput;
    }

    setEvalState('loading');
    try {
      const payload = { challengeId: id, submission };
      const response = await fetch('http://localhost:5000/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      setEvalState('idle');
      navigate('/result', { state: { ...result, challengeId: id } });
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again.');
      setEvalState('idle');
    }
  };

  return (
    <>
      <Modal show={evalState === 'loading'} loading message="Evaluating your answer..." />
      {/*bg-gradient-to-br from-black via-gray-900 to-black*/}
      {/* bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-md*/}
      
  <div className="relative min-h-screen mt-6 flex flex-col items-center  backdrop-blur-md px-6 py-12 overflow-auto">
    {/* Background Orbs */}
    {/* <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-pink-600 opacity-25 blur-[150px] rounded-full animate-fade-in"></div> */}
    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600 opacity-20 blur-[180px] rounded-full animate-fade-in delay-200"></div>

    <div className="w-full flex-1 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-2xl space-y-8">
      {/* Wallet Banner */}
      <div className='text-center'>
        
      <p className={`inline-block px-6 py-2 rounded-xl text-sm font-semibold shadow-inner ${
          walletAddress 
            ? 'bg-green-600/80 text-white' 
            : 'bg-red-600/80 text-white animate-pulse'
        }`}>
        {walletAddress ? `Wallet: ${walletAddress}` : 'Phantom wallet not connected'}
      </p>
      </div>

      {/* Title */}
      <h2 className="text-center text-4xl sm:text-5xl font-extrabold leading-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
          Challenge {id}: {detail.name}
        </span>
        <span className="block mt-2 text-lg font-mono text-purple-300">
          {detail.symbol}
        </span>
      </h2>

      {/* Tasks */}
      <div className="space-y-4 text-lg leading-relaxed">
        <p className="font-semibold text-purple-200">
          Tasks <span className="text-gray-400">(complete any one)</span>
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          {detail.tasks.map((t,i) => (
            <li key={i} className="pl-2 border-l-2 border-purple-600/60 hover:border-purple-400 transition">
              <span className="text-gray-300">{t}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Mode Selector */}
      <div className="flex justify-center gap-4">
        {['text','code','file'].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-6 py-2 rounded-xl font-medium transition ${
              mode === m
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Submission */}
      <div>
        {mode === 'text' && (
          <textarea
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            rows={12}
            className="w-full p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            placeholder="Type your answer…"
          />
        )}
        {mode === 'code' && (
          <textarea
            value={codeInput}
            onChange={e => setCodeInput(e.target.value)}
            rows={12}
            className="w-full font-mono p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Type your code…"
          />
        )}
        {mode === 'file' && (
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept=".txt,.md,.pdf,.doc,.docx"
              onChange={e => setFile(e.target.files[0]||null)}
              className="file:px-5 file:py-2 file:rounded-full file:bg-purple-600/80 file:text-white hover:file:bg-purple-500 transition"
            />
            {file && <p className="mt-2 text-sm text-purple-300">{file.name}</p>}
          </div>
        )}
        {errorMsg && <p className="mt-3 text-red-400">{errorMsg}</p>}
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-10 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          Submit
        </button>
      </div>
    </div>
  </div>


    </>
  );
}
