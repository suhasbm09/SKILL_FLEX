import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import * as anchor from '@coral-xyz/anchor';
import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import Modal from '../components/Modal';
import idl from '../assets/utils/skill_certificate.json';
import { NETWORK, COMMITMENT } from '../assets/constants';
import { WalletContext } from '../components/WalletContext';
import '../index.css';
import { challengeDetails } from '../assets/Challenge_Tasks.jsx';
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { walletAddress } = useContext(WalletContext);

  const isPassed = (state?.score ?? 0) >= 85;
  const score = state?.score ?? 0;
  const detail = challengeDetails[state.challengeId];

  const [mintState, setMintState] = useState('idle');
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintData, setMintData] = useState(null);

  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [showCredModal, setShowCredModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (showConfetti) {
      const t = setTimeout(() => setShowConfetti(false), 6000);
      return () => clearTimeout(t);
    }
  }, [showConfetti]);

  useEffect(() => {
    if (showErrorModal) {
      const t = setTimeout(() => setShowErrorModal(false), 1500);
      return () => clearTimeout(t);
    }
  }, [showErrorModal]);

  useEffect(() => {
    if (showSuccessModal) {
      const t = setTimeout(() => setShowSuccessModal(false), 2000);
      return () => clearTimeout(t);
    }
  }, [showSuccessModal]);

  const callMintCredential = async () => {
    if (!walletAddress) {
      setModalMsg('⚠️ Phantom wallet not connected.');
      setShowErrorModal(true);
      return;
    }
    setMintState('loading');
    try {
      const provider = new anchor.AnchorProvider(
        new Connection(NETWORK, COMMITMENT),
        window.solana,
        { commitment: COMMITMENT, preflightCommitment: COMMITMENT }
      );
      anchor.setProvider(provider);
      const program = new anchor.Program(idl, provider);
      const mint = anchor.web3.Keypair.generate();
      const tokenAccount = await getAssociatedTokenAddress(
        mint.publicKey,
        provider.wallet.publicKey
      );
      const [metadataPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('metadata'), METADATA_PROGRAM_ID.toBuffer(), mint.publicKey.toBuffer()],
        METADATA_PROGRAM_ID
      );
      const [masterEditionPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          METADATA_PROGRAM_ID.toBuffer(),
          mint.publicKey.toBuffer(),
          Buffer.from('edition'),
        ],
        METADATA_PROGRAM_ID
      );
      const gen = await fetch('http://localhost:5000/generate_metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: state.challengeId,
          score,
          wallet: provider.wallet.publicKey.toString(),
        }),
      }).then((r) => r.json());
      const { metadataUri, imageUri } = gen;
      const tx = await program.methods
        .minting(`${detail.symbol} Credential`, detail.symbol, metadataUri)
        .accounts({
          user: provider.wallet.publicKey,
          mint: mint.publicKey,
          tokenAccount,
          metadata: metadataPda,
          masterEdition: masterEditionPda,
          tokenMetadataProgram: METADATA_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .signers([mint])
        .rpc();
      await fetch('http://localhost:5000/record_mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet: provider.wallet.publicKey.toString(),
          mintPubkey: mint.publicKey.toString(),
          metadataUri,
          signature: tx,
          challengeId: state.challengeId,
          score: score
        }),
      });
      setMintState('idle');
      setMintSuccess(true);
      setMintData({ metadataUri, imageUri, tx });
      setShowConfetti(true);
      setShowSuccessModal(true);
    } catch (err) {
      setMintState('error');
      setModalMsg('❌ Mint failed. Please try again.');
      setShowErrorModal(true);
    }
  };

  // Copy NFT image link
  const handleCopy = () => {
    if (mintData?.imageUri) {
      navigator.clipboard.writeText(mintData.imageUri);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <>
      {showConfetti && <Confetti recycle={false} />}
      <Modal show={mintState === 'loading'} loading message="🚀 Minting your Proof…" />
      <Modal
        show={showErrorModal}
        message={modalMsg}
        onClose={() => setShowErrorModal(false)}
        type="error"
      />
      <Modal
        show={showSuccessModal}
        message="🎉 Minted Successfully!"
        onClose={() => setShowSuccessModal(false)}
        type="success"
      />

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 w-full">
        {/* Hero Title */}
        <h1 className="text-5xl sm:text-6xl font-extrabold gradient-text text-center mb-12 animate-fade-in-up">Assessment Outcome</h1>

        {/* Result Card */}
        <div
          className={`w-full max-w-4xl mx-auto glass rounded-3xl p-12 shadow-2xl border border-white/20 mb-12 animate-fade-in-up ${
            isPassed ? 'ring-4 ring-green-400/40' : 'ring-4 ring-red-400/40'
          } relative overflow-hidden`}
        >
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Animated Icon */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center">
              <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-4 shadow-lg ${isPassed ? 'bg-green-500/20 shadow-green-400/30' : 'bg-red-500/20 shadow-red-400/30'} animate-fade-in-up`}>
                {isPassed ? (
                  <svg className="w-16 h-16 text-green-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="11" fill="#22c55e" fillOpacity="0.10" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 13l4 4L18 7" />
                  </svg>
                ) : (
                  <svg className="w-16 h-16 text-red-400 animate-shake" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="11" fill="#ef4444" fillOpacity="0.10" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <span className={`text-4xl font-extrabold mt-2 ${isPassed ? 'text-green-400' : 'text-red-400'} animate-fade-in-up`}>{score}%</span>
            </div>
            {/* Details & Message */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2 gradient-text animate-fade-in-up">
                {isPassed ? 'Congratulations!' : 'Almost There'}
              </h2>
              <p className="text-lg text-gray-300 mb-4 animate-fade-in-up">
                {isPassed
                  ? 'You have met the threshold—finalize your credential below.'
                  : 'A minimum of 85% is required. Retake to improve your score.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up">
                <button
                  onClick={() =>
                    navigate(isPassed ? '/' : `/challenge/${state.challengeId}`)
                  }
                  className="px-8 py-3 rounded-2xl glass font-semibold shadow-lg hover:scale-105 transition-all duration-300 text-white text-lg"
                >
                  {isPassed ? 'Go Home' : 'Retake Challenge'}
                </button>
                {isPassed && (
                  <button
                    onClick={callMintCredential}
                    disabled={mintState === 'loading' || mintSuccess}
                    className={`px-8 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300 text-white text-lg flex items-center gap-2 ${
                      mintSuccess
                        ? 'bg-green-600/80 cursor-default animate-pulse'
                        : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 glow'
                    } ${mintState === 'loading' ? 'opacity-60' : ''}`}
                  >
                    {mintSuccess ? (
                      <>
                        <span>Minted!</span>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      </>
                    ) : (
                      <span>Finalize Credential</span>
                    )}
                  </button>
                )}
                {mintSuccess && (
                  <button
                    onClick={() => setShowCredModal(true)}
                    className="px-8 py-3 rounded-2xl bg-gradient-to-l from-yellow-400 to-orange-500 text-black font-semibold shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in-up flex items-center gap-2"
                  >
                    🎖️ View Credential
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* NFT Credential Modal */}
        {showCredModal && mintData && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up">
            <div className="w-full max-w-md sm:max-w-lg glass rounded-3xl p-8 border border-white/20 shadow-2xl text-center relative animate-fade-in-up">
              <button
                onClick={() => setShowCredModal(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 p-1"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <h3 className="text-2xl font-bold gradient-text mb-6 animate-fade-in-up">Your Minted Credential</h3>
              <img
                src={mintData.imageUri}
                alt="Your NFT"
                className="w-full rounded-xl shadow-xl mb-6 border-4 border-purple-500/30 animate-fade-in-up"
                style={{ boxShadow: '0 0 40px 0 rgba(168,85,247,0.3)' }}
              />
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4 animate-fade-in-up">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    mintData.imageUri
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow hover:opacity-90 transition flex items-center gap-2 justify-center"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.041 0 3.603 2.002 3.603 4.604v5.592z"/></svg>
                  LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    mintData.imageUri
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-xl shadow hover:opacity-90 transition flex items-center gap-2 justify-center"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 00-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0024 4.557z"/></svg>
                  Twitter
                </a>
                <button
                  onClick={handleCopy}
                  className={`flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow hover:opacity-90 transition flex items-center gap-2 justify-center ${copied ? 'animate-pulse' : ''}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-7 8h6a2 2 0 002-2V7a2 2 0 00-2-2h-5.586a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 007.586 2H5a2 2 0 00-2 2v16a2 2 0 002 2h3" /></svg>
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
              <p className="text-gray-400 text-xs mt-2 animate-fade-in-up">Share your achievement and inspire others!</p>
              <button
                onClick={() => setShowCredModal(false)}
                className="mt-4 cursor-pointer text-gray-300 hover:text-white transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
