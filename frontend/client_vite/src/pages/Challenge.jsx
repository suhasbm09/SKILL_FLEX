import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { WalletContext } from '../components/WalletContext';
import { challengeDetails, skills } from '../assets/Challenge_Tasks';
import { FaCode, FaFileAlt, FaKeyboard, FaClock, FaBolt, FaTag, FaArrowRight } from 'react-icons/fa';
import MonacoEditor from '@monaco-editor/react';

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
  const skill = skills && skills.find(s => String(s.id) === String(id));
  const difficulty = skill ? skill.difficulty : detail?.difficulty;
  const duration = skill ? skill.duration : detail?.duration;
  const type = detail?.type || (mode === 'code' ? 'Code' : mode === 'file' ? 'File' : 'Text');

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
      setErrorMsg('Something went wrong. Please try again.');
      setEvalState('idle');
    }
  };

  // Icon for challenge type
  const modeIcons = {
    text: <FaKeyboard className="text-pink-400" />, 
    code: <FaCode className="text-purple-400" />, 
    file: <FaFileAlt className="text-blue-400" />
  };

  // Pill badge style for difficulty (match Home.jsx)
  const getDifficultyBadge = (difficulty) => {
    if (difficulty === 'Expert') return 'bg-red-500/20 text-red-400 border border-red-500/30';
    if (difficulty === 'Advanced') return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
    return 'bg-green-500/20 text-green-400 border border-green-500/30';
  };

  return (
    <>
      <Modal show={evalState === 'loading'} loading message="Evaluating your answer..." />
      <div className="relative min-h-screen flex flex-col items-center pt-36 pb-24 px-2 sm:px-6 lg:px-12 w-full animate-fade-in-up">
        {/* Challenge Info Row */}
        <section className="w-full max-w-7xl mx-auto mb-16 flex flex-col items-center">
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center gap-4 mb-4">
              {modeIcons[detail.type] || <FaKeyboard className="text-pink-400" />} 
              <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text text-center">{detail.name}</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-2">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getDifficultyBadge(difficulty)}`}>{difficulty}</span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">{duration}</span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 capitalize">{type}</span>
            </div>
            <div className="text-lg sm:text-xl text-purple-300 font-mono mb-2">{detail.symbol}</div>
          </div>
        </section>

        {/* Task Prompt - Centerpiece */}
        <section className="w-full max-w-7xl mx-auto mb-14">
          <div className="glass rounded-3xl p-10 shadow-xl border border-white/20 flex flex-col gap-6 items-center text-center animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text">Challenge Task</h2>
            <ol className="list-decimal list-inside space-y-6 text-left w-full max-w-2xl mx-auto text-lg sm:text-xl text-gray-200 font-medium">
              {detail.tasks.map((t, i) => (
                <li key={i} className="pl-2 border-l-4 border-purple-600/60 hover:border-purple-400 transition-all py-2">{t}</li>
              ))}
            </ol>
          </div>
        </section>

        {/* Motivational/Instructional Banner */}
        <section className="w-full max-w-4xl mx-auto mb-14">
          <div className="glass rounded-2xl p-6 text-center border border-white/20 animate-fade-in-up">
            <h3 className="text-xl sm:text-2xl font-semibold gradient-text mb-2">Prove your skills</h3>
            <p className="text-gray-300 text-base sm:text-lg">Submit your answer below and let the AI evaluate your skills. Good luck!</p>
          </div>
        </section>

        {/* Answer Area */}
        <section className="w-full max-w-7xl mx-auto animate-fade-in-up">
          <div className="glass rounded-3xl p-10 shadow-2xl border border-white/20 flex flex-col gap-8 items-center">
            {/* Mode Selector */}
            <div className="flex justify-center gap-6 mb-8 w-full">
              {['text','code','file'].map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 px-8 py-3 rounded-xl font-medium transition-all duration-300 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 flex items-center gap-2 justify-center ${
                    mode === m
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105 glow'
                      : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
                  }`}
                >
                  {modeIcons[m]} <span>{m.toUpperCase()}</span>
                </button>
              ))}
            </div>
            {/* Submission */}
            <div className="w-full mb-6">
              {mode === 'text' && (
                <textarea
                  value={textInput}
                  onChange={e => setTextInput(e.target.value)}
                  rows={10}
                  className="w-full p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition text-lg"
                  placeholder="Type your answer…"
                />
              )}
              {mode === 'code' && (
                <div className="w-full h-[400px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden animate-fade-in-up">
                  <MonacoEditor
                    height="100%"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={codeInput}
                    onChange={v => setCodeInput(v || '')}
                    options={{
                      fontSize: 16,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      wordWrap: 'on',
                      fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace',
                      lineNumbers: 'on',
                      automaticLayout: true,
                      smoothScrolling: true,
                      scrollbar: { vertical: 'auto', horizontal: 'auto' },
                      theme: 'vs-dark',
                      renderLineHighlight: 'all',
                      cursorSmoothCaretAnimation: true,
                      tabSize: 2,
                      padding: { top: 16, bottom: 16 },
                      overviewRulerLanes: 0,
                      fixedOverflowWidgets: true
                    }}
                  />
                </div>
              )}
              {mode === 'file' && (
                <div className="flex flex-col items-center">
                  <input
                    type="file"
                    accept=".txt,.md,.pdf,.doc,.docx"
                    onChange={e => setFile(e.target.files[0]||null)}
                    className="file:px-6 file:py-3 file:rounded-full file:bg-purple-600/80 file:text-white hover:file:bg-purple-500 transition text-lg"
                  />
                  {file && <p className="mt-2 text-base text-purple-300">{file.name}</p>}
                </div>
              )}
              {errorMsg && <p className="mt-3 text-red-400 animate-fade-in-up text-lg">{errorMsg}</p>}
            </div>
            {/* Wallet Banner */}
            <div className="text-center mb-4 w-full">
              <p className={`inline-block px-6 py-2 rounded-xl text-sm font-semibold shadow-inner transition-all duration-300 ${
                walletAddress 
                  ? 'bg-green-600/80 text-white' 
                  : 'bg-red-600/80 text-white animate-pulse'
              }`}>
                {walletAddress ? `Wallet: ${walletAddress}` : 'Phantom wallet not connected'}
              </p>
            </div>
            {/* Submit */}
            <div className="flex justify-center w-full">
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto px-16 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-2xl hover:scale-105 transition-transform glow text-xl flex items-center justify-center gap-3"
              >
                Submit <FaArrowRight className="ml-1" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
