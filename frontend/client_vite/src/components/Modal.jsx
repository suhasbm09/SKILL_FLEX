import { Fragment, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes, FaSpinner } from 'react-icons/fa';

export default function Modal({ show, message, loading, onClose, type = 'info' }) {
  // lock background scroll
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [show]);

  if (!show) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: 'text-green-400',
          border: 'border-green-500/30',
          bg: 'bg-green-500/10'
        };
      case 'error':
        return {
          icon: 'text-red-400',
          border: 'border-red-500/30',
          bg: 'bg-red-500/10'
        };
      case 'warning':
        return {
          icon: 'text-yellow-400',
          border: 'border-yellow-500/30',
          bg: 'bg-yellow-500/10'
        };
      default:
        return {
          icon: 'text-purple-400',
          border: 'border-purple-500/30',
          bg: 'bg-purple-500/10'
        };
    }
  };

  const typeStyles = getTypeStyles();

  return createPortal(
    <Fragment>
      {/* Enhanced Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={() => !loading && onClose?.()}
      />

      {/* Enhanced Modal panel */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
      >
        <div 
          className={`relative w-full max-w-sm sm:max-w-md p-6 sm:p-8 glass rounded-3xl shadow-2xl text-center flex flex-col items-center border ${typeStyles.border} animate-fade-in-up`}
        >
          {/* Close button */}
          {!loading && onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 p-1"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>
          )}

          {/* Icon */}
          <div className={`text-4xl mb-4 ${typeStyles.icon}`}>
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              getTypeIcon(type)
            )}
          </div>

          {/* Message */}
          <p className="mb-6 text-lg sm:text-xl font-semibold text-white leading-relaxed">
            {message}
          </p>

          {/* Loading animation */}
          {loading && <EnhancedDotLoader />}

          {/* Action buttons */}
          {!loading && onClose && (
            <div className="flex gap-3 w-full">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 glow"
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>,
    document.body
  );
}

// Enhanced animated dots with better styling
function EnhancedDotLoader() {
  return (
    <div className="flex space-x-2 mb-4">
      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce" />
      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce delay-150" />
      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce delay-300" />
    </div>
  );
}

// Type-specific icons
function getTypeIcon(type) {
  switch (type) {
    case 'success':
      return (
        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    case 'error':
      return (
        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      );
    case 'warning':
      return (
        <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
  }
}
