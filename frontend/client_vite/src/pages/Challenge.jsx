import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { WalletContext } from '../components/WalletContext';
import '../index.css';
import { challengeDetails } from '../assets/Challenge_Tasks';
const inputModes = [
  { key: 'text', label: 'Text' },
  { key: 'code', label: 'Code' },
  { key: 'file', label: 'File' },
];

export default function Challenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { walletAddress } = useContext(WalletContext);

  const [mode, setMode] = useState('text');          // 'text' | 'code' | 'file'
  const [textInput, setTextInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [file, setFile] = useState(null);            // File object
  const [evalState, setEvalState] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');       // 'idle' | 'loading' | 'error'
  const detail = challengeDetails[id];  

  if (!detail) {
    return <p className="p-6 text-red-400">Challenge not found.</p>;
  }

  const handleSubmit = async () => {
    setErrorMsg('');
    let submission = '';

    if (mode === 'file') {
      if (!file) {
        return setErrorMsg('Please upload a file to submit.');
      }
      // read file as text
      submission = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result.toString());
        reader.onerror = () => rej();
        reader.readAsText(file);
      });
    } else if (mode === 'code') {
      if (!codeInput.trim()) {
        return setErrorMsg('Please  your code before submitting.');
      }
      submission = codeInput;
    } else {
      if (!textInput.trim()) {
        return setErrorMsg('Please type your answer before submitting.');
      }
      submission = textInput;
    }

    setEvalState('loading');
    try {
      const payload = { challengeId: id, submission };
      const response = await fetch('http://localhost:5000/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      setEvalState('idle');
      navigate('/result', { state: {...result ,challengeId:id}});
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again.');
      setEvalState('idle');
    }
  };

  return (
    <>
      <Modal
        show={evalState === 'loading'}
        loading
        message="Evaluating your answer...."
        
      />


          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">

            <div className="w-full max-w-full mx-auto px-8 py-10 bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-md border-[1.5px] border-purple-800/60 rounded-3xl shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] space-y-10">

              {/* Wallet banner */}
              <p
                className={`w-fit mx-auto px-6 py-2 rounded-md text-sm tracking-wider font-semibold shadow-inner shadow-black/50
                  ${walletAddress ? 'bg-green-600/80' : 'bg-red-600/80 animate-pulse'}`}>
                {walletAddress ? `Wallet: ${walletAddress}` : 'Phantom wallet not connected'}
              </p>
                
              {/* Title */}
              <h2 className="text-center text-4xl sm:text-5xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-fuchsia-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(168,85,247,0.65)]">
                  Challenge&nbsp;{id}:&nbsp;{detail.name}
                </span>
                <span className="block mt-2 text-base sm:text-lg font-mono text-purple-300 tracking-widest">
                  {detail.symbol}
                </span>
              </h2>
                
              {/* Tasks */}
              <div className="space-y-4 text-lg leading-relaxed">
                <p className="font-semibold text-purple-200">
                  Tasks&nbsp;<span className="text-sm text-gray-400">(complete&nbsp;<i>any&nbsp;one</i>)</span>
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  {detail.tasks.map((t, i) => (
                    <li
                      key={i}
                      className="pl-2 border-l-2 border-purple-600/60 hover:border-purple-400">
                      <span className="text-gray-300 text-xl">{t}</span>
                    </li>
                  ))}
                </ol>
              </div>
                
              {/* Mode selector */}
              <div className="flex justify-center gap-4">
                {['text', 'code', 'file'].map(m => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-6 py-2 rounded-md tracking-wide font-medium transition-all duration-200 shadow
                      ${mode === m
                        ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-purple-600/40'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:shadow-md'}`}>
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>
              
              {/* Input area */}
              <div>
                {mode === 'text' && (
                  <textarea
                    value={textInput}
                    onChange={e => setTextInput(e.target.value)}
                    rows={15}
                    className="w-full p-5 bg-gray-800/70 rounded-2xl resize-none placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 transition"
                    placeholder="Type your answer…"
                  />
                )}
                {mode === 'code' && (
                  <textarea
                    value={codeInput}
                    onChange={e => setCodeInput(e.target.value)}
                    rows={15}
                    className="font-mono w-full p-6 bg-gray-900/80 rounded-2xl resize-none placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                    placeholder="Type your code…"
                  />
                )}
                {mode === 'file' && (
                  <div className="flex flex-col items-center">
                    <input
                      type="file"
                      accept=".txt,.md,.pdf,.doc,.docx"
                      onChange={e => setFile(e.target.files[0] || null)}
                      className="file:px-5 file:py-2 file:rounded-md file:border-0 file:bg-purple-700/80 file:text-white hover:file:bg-purple-600 transition"
                    />
                    {file && <p className="mt-3 text-sm text-purple-300">{file.name}</p>}
                  </div>
                )}
                {errorMsg && <p className="mt-3 text-red-400">{errorMsg}</p>}
              </div>
              
              {/* Submit */}
              <div data-aos="fade-up" className='flex justify-center'>
                  <button
                    onClick={handleSubmit}
                    className="mx-auto justify-center text-center w-fit px-10 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white font-semibold tracking-wider shadow-lg hover:shadow-fuchsia-600/40 hover:scale-105 transition">
                    Submit
                  </button>  
              </div>


            </div>
          </div>


    </>
  );
}
