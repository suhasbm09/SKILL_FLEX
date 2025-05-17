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
      console.error(err);
      setMintState('error');
      setModalMsg('❌ Mint failed. Please try again.');
      setShowErrorModal(true);
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
      />
      <Modal
        show={showSuccessModal}
        message="🎉 Minted Successfully!"
        onClose={() => setShowSuccessModal(false)}
      />

      <div className="relative min-h-screen flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm px-6 py-12 space-y-8">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-pulse">
          Assessment Outcome
        </h1>

        {/* Result Card */}
        <div
          className={`
            w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-2xl border border-white/20
            ${isPassed ? 'ring-4 ring-green-400/40' : 'ring-4 ring-red-400/40'}
            relative overflow-hidden
          `}
        >
          <div className="flex justify-center mb-4">
            {isPassed ? (
              <svg
                className="w-16 h-16 text-green-400 animate-bounce"
                fill="currentColor"
                viewBox="0 0 30 30"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-16 h-16 text-red-400 animate-shake"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4h2v2h-2v-2zm0-8h2v6h-2V6z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <h2 className="text-3xl font-bold text-center mb-2">
            {isPassed ? 'Congratulations!' : 'Almost There'}
          </h2>
          <p className="text-center text-lg mb-4">
            Your score:{' '}
            <span
              className={`font-semibold ${
                isPassed ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {score}%
            </span>
          </p>
          <p className="text-center text-gray-300 mb-6">
            {isPassed
              ? 'You’ve met the threshold—finalize your credential below.'
              : 'A minimum of 85% is required. Retake to improve your score.'}
          </p>

          {/* Mint Button */}
          <div className="flex justify-center">
            <button
              onClick={callMintCredential}
              disabled={!isPassed || mintState === 'loading'}
              className={`
                px-8 py-3 rounded-2xl font-semibold cursor-pointer text-white shadow-lg transition-transform
                ${
                  isPassed
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105'
                    : 'bg-gray-700 cursor-not-allowed opacity-70'
                }
                ${mintState === 'loading' ? 'opacity-60' : ''}
              `}
            >
              {mintSuccess
                ? 'Minted!'
                : isPassed
                ? 'Finalize Credential'
                : 'Mint Unavailable'}
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() =>
              navigate(isPassed ? '/' : `/challenge/${state.challengeId}`)
            }
            className="px-6 cursor-pointer py-3 bg-gradient-to-r from-purple-500/70 to-cyan-500/70 text-white rounded-2xl shadow-lg hover:scale-105 transition"
          >
            {isPassed ? 'Go Home' : 'Retake Challenge'}
          </button>
          {mintSuccess && (
            <button
              onClick={() => setShowCredModal(true)}
              className="px-6 py-3 cursor-pointer bg-gradient-to-l from-yellow-400 to-orange-500 text-black rounded-2xl shadow-lg hover:scale-105 animate-pulse transition"
            >
              🎖️ View Credential
            </button>
          )}
        </div>

        {/* Credential Modal */}
        {showCredModal && mintData && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-sm bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-3xl shadow-2xl text-center space-y-4">
              <img
                src={mintData.imageUri}
                alt="Your NFT"
                className="w-full rounded-xl shadow-md"
              />
              <p className="text-lg font-bold text-white">
                Share your achievement:
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    mintData.imageUri
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow hover:opacity-90 transition"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    mintData.imageUri
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-xl shadow hover:opacity-90 transition"
                >
                  Twitter
                </a>
              </div>
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
