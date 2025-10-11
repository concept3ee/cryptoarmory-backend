import React from 'react';
import { useAuth } from '../../context/AuthContext';

const SessionWarning: React.FC = () => {
  const { isSessionWarning, sessionSecondsLeft, extendSession } = useAuth();
  if (!isSessionWarning) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[100000] p-3 sm:p-4">
      <div className="mx-auto max-w-md rounded-xl border border-yellow-500/30 bg-yellow-900/80 backdrop-blur-md text-yellow-100 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            You will be logged out in <span className="font-semibold">{sessionSecondsLeft}s</span> due to inactivity.
          </div>
          <button onClick={extendSession} className="ml-3 rounded-lg bg-yellow-600/80 px-3 py-1 text-sm font-semibold hover:bg-yellow-600">Stay signed in</button>
        </div>
      </div>
    </div>
  );
};

export default SessionWarning;


