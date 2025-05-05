import React, { useContext, useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
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
// window.Buffer = require('buffer').Buffer;

const TOKEN_PROGRAM_ID            = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const METADATA_PROGRAM_ID         = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

export default function Result() {
  const navigate = useNavigate();
  const { state }         = useLocation();
  const { walletAddress } = useContext(WalletContext);

  const isPassed = (state?.score ?? 0) >= 85;
  const score    = state?.score ?? 0;
  const [mintSuccess, setMintSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);  // NEW

  // NEW: import challenge definitions so you can pass name+symbol to mint()
  const detail = challengeDetails[state.challengeId];
  // NEW: hold the URIs returned by your metadata endpoint
  const [mintData, setMintData]       = useState(null);
  const [showCredModal, setShowCredModal] = useState(false);

  const [mintState, setMintState]       = useState('idle');   // 'idle'|'loading'|'error'
  const [showConfetti, setShowConfetti] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  // stop confetti after 5s
  useEffect(() => {
    if (showConfetti) {
      const t = setTimeout(() => setShowConfetti(false), 6000);
      return () => clearTimeout(t);
    }
  }, [showConfetti]);

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
        mint.publicKey, provider.wallet.publicKey
      );

      const [metadataPda]      = PublicKey.findProgramAddressSync(
        [Buffer.from('metadata'), METADATA_PROGRAM_ID.toBuffer(), mint.publicKey.toBuffer()],
        METADATA_PROGRAM_ID
      );
      const [masterEditionPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('metadata'), METADATA_PROGRAM_ID.toBuffer(), mint.publicKey.toBuffer(), Buffer.from('edition')],
        METADATA_PROGRAM_ID
      );

     // 0) generate metadata + image on backend
      const gen = await fetch('http://localhost:5000/generate_metadata', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          challengeId: state.challengeId,
          score,
          wallet: provider.wallet.publicKey.toString()
        })
      }).then(r=>r.json());
      const { metadataUri, imageUri } = gen;

      const tx = await program.methods
        .minting(
          `${detail.symbol} Credential`,
          detail.symbol,
          metadataUri
        )
        .accounts({
          user:                   provider.wallet.publicKey,
          mint:                   mint.publicKey,
          tokenAccount,
          metadata:               metadataPda,
          masterEdition:          masterEditionPda,
          tokenMetadataProgram:   METADATA_PROGRAM_ID,
          tokenProgram:           TOKEN_PROGRAM_ID,
          systemProgram:          SystemProgram.programId,
          rent:                   anchor.web3.SYSVAR_RENT_PUBKEY,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .signers([mint])
        .rpc();

      // record in DB...
      await fetch('http://localhost:5000/record_mint', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({
          wallet:     provider.wallet.publicKey.toString(),
          mintPubkey: mint.publicKey.toString(),
          metadataUri,
          signature:  tx
        })
      });
      setMintState('idle');
      setMintData({ metadataUri, imageUri, tx });
      setMintSuccess(true);       // <=== NEW
      setShowConfetti(true);      // Confetti
      setShowSuccessModal(true);  // <=== NEW: popup
    } catch (err) {
      console.error(err);
      setMintState('error');
    }
  };
  useEffect(() => {
    if (showErrorModal) {
      const t = setTimeout(() => setShowErrorModal(false), 1000);
      return () => clearTimeout(t);
    }
  }, [showErrorModal]);

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => setShowSuccessModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);
  
 
  return (
    <>
      {showConfetti && <Confetti recycle={false} />}
      <Modal
        show={mintState === 'loading'}
        loading
        message="🚀 Minting your Proof…"
        
      />
      <Modal
        show={showErrorModal}
        message={modalMsg}
        onClose={() => setShowErrorModal(false)}
      />
      <Modal
      show={showSuccessModal}
      message="🎉 Minted Successfully!"
      onClose={() => setShowSuccessModal(false)}
      />

      <div data-aos="fade-right" className="min-h-screen  flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-12 space-y-8">
        
      {/* 1. Professional Title */}
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4 animate-pulse">
        Assessment Outcome
      </h1>
        
      {/* 2. Result Card */}
      <div
        className={`relative w-full max-w-xl p-8 rounded-3xl shadow-2xl
          ${isPassed ? 'bg-green-900/60 ring-4 ring-green-500/40' : 'bg-red-900/60 ring-4 ring-red-500/40'}
          before:absolute before:inset-0 before:bg-gradient-to-tr before:from-transparent before:via-white/10 before:to-transparent before:rounded-3xl before:blur-xl`}
      >
        {/* Icon */}
        <div className="mb-4">
          {isPassed ? (
            <svg className="mx-auto w-16 h-16 text-green-400 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="mx-auto w-16 h-16 text-red-400 animate-shake" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4h2v2h-2v-2zm0-8h2v6h-2V6z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        
        {/* Message */}
        <h2 className="text-3xl font-bold text-center mb-2">
          {isPassed ? 'Congratulations!' : 'Almost There'}
        </h2>
        <p className="text-lg text-center mb-4">
          Your proficiency score is 
          <span className={`${isPassed ? 'text-green-400' : 'text-red-400'} font-semibold ml-1`}>
            {score}%
          </span>
        </p>
        <p className="text-center text-gray-300 mb-6">
          {isPassed
            ? 'You’ve met the threshold - finalize your credential below.'
            : 'A minimum of 85% is required to mint. Retake to improve your score.'}
        </p>
          
        {/* 3. Action Buttons */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={callMintCredential}
            disabled={!isPassed || mintState==='loading'}
            className={`relative px-8 py-3 rounded-2xl font-semibold text-white shadow-xl overflow-hidden transition-transform
              ${isPassed 
                ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-pink-500 hover:to-purple-700 hover:cursor-pointer'
                : 'bg-gray-700 cursor-not-allowed '}
              ${mintState==='loading' ? 'opacity-60' : 'hover:scale-105'}
            `}
          >
            <span className="relative z-10">
              {mintSuccess ? 'Minted!' : (isPassed ? 'Finalize Credential' : 'Mint Unavailable')}

            </span>
          </button>
              
        </div>
      </div>

      {mintSuccess ? (
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 font-semibold shadow-lg transition hover:scale-105 rounded-2xl"
        >
          Go Back Home
        </button>
      ) : (
        <button
          onClick={() => navigate(`/challenge/${state.challengeId}`)}
          className="px-6 py-3 cursor-pointer bg-gradient-to-r from-fuchsia-500 to-cyan-600 hover:bg-pink-400 font-semibold shadow-lg transition hover:scale-105 rounded-2xl"
        >
          Retake Challenge
        </button>
      )}


      {mintSuccess && (
        <button
          onClick={() => setShowCredModal(true)}
          className="mt-6 px-6 py-3 cursor-pointer bg-gradient-to-l from-yellow-400 to-orange-500 hover:scale-105 rounded-xl text-black font-semibold shadow-lg animate-pulse transition"
        >
          🎖️ View Your Credential
        </button>
      )}
        {/* Credential Modal */}
        {showCredModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-black via-gray-800 to-gray-900 border-2 border-purple-700 shadow-lg shadow-purple-600 p-6 rounded-2xl max-w-sm text-center space-y-4">
              <img src={mintData.imageUri} alt="Your NFT" className="rounded-lg shadow-lg mx-auto" />
                <p className='flex justify-center text-xl font-extrabold text-green-600 text-center'>Congrats!! Now you can share it on.</p>
              <div className="flex justify-center space-x-4">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(mintData.imageUri)}`}
                  target="_blank" className="px-4 py-2 border-2 border-pink-400 font-bold bg-gradient-to-l from-fuchsia-400 to-purple-400 rounded-xl"
                  >
                  LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(mintData.imageUri)}`}
                  target="_blank" className="px-4 py-2 border-2 border-pink-400 font-bold bg-gradient-to-l from-fuchsia-400 to-purple-400 rounded-xl"
                  >
                  X
                </a>
              </div>
              <button onClick={()=>setShowCredModal(false)} className="mt-2 text-gray-400 hover:text-white">
                Close
              </button>
            </div>
          </div>
        )}


        </div>
    </>
  );
}

          