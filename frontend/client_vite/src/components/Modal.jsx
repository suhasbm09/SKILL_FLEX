import { Fragment, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ show, message, loading, onClose }) {
  // lock background scroll
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [show]);

  if (!show) return null;

  return createPortal(
    <Fragment>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={() => !loading && onClose?.()}
      />

      {/* Modal panel */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative w-full max-w-xs p-6 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl text-center flex flex-col items-center">
          <p className="mb-4 text-lg font-semibold text-white">{message}</p>
          {loading && <DotLoader />}
          {/* optional close button */}
          {!loading && onClose && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white/70 hover:text-white transition"
              aria-label="Close modal"
            >
              &times;
            </button>
          )}
        </div>
      </div>
    </Fragment>,
    document.body
  );
}

// three animated dots
function DotLoader() {
  return (
    <div className="flex space-x-2">
      <span className="w-3 h-3 bg-white rounded-full animate-bounce" />
      <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-150" />
      <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-300" />
    </div>
  );
}
