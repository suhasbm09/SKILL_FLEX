import { Fragment, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ show, message, loading }) {
  // lock background scroll
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [show]);

  if (!show) return null;
  return createPortal(
    <Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gradient-to-l from-gray-900 to-gray-600 text-green-600 border-purple-800 p-6 rounded-2xl shadow-xl w-80 text-center">
          <p className="mb-4">{message}</p>
          {loading && <DotLoader />}
        </div>
      </div>
    </Fragment>,
    document.body
  );
}

// simple three-dot loader
function DotLoader() {
  return (
    <p className="font-mono text-2xl animate-pulse">
      <span className="inline-block">.</span>
      <span className="inline-block delay-200">.</span>
      <span className="inline-block delay-400">.</span>
    </p>
  );
}
