import React from 'react';
import { Copy, History } from 'lucide-react';
import toast from 'react-hot-toast';
import { SpinResult } from '../types';

interface SpinHistoryProps {
  history: SpinResult[];
}

const SpinHistory: React.FC<SpinHistoryProps> = ({ history }) => {
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copiado!`, {
      duration: 2000,
      style: {
        background: '#dcfce7',
        color: '#166534',
      },
    });
  };

  return (
    <div className="w-full bg-green-900 rounded-lg shadow-xl p-4">
      <h2 className="text-xl text-green-100 mb-4 flex items-center gap-2">
        <History className="w-5 h-5" />
        Histórico de Jogadas
      </h2>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {history.map((spin, index) => (
          <div key={index} className="bg-green-800 p-3 rounded-lg">
            <div className="text-green-100 text-sm">
              <p>Resultado: {spin.prize}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-green-300">Game Hash: {spin.gameHash.slice(0, 16)}...</p>
                <button
                  onClick={() => handleCopy(spin.gameHash, 'Game Hash')}
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-green-300">Result Hash: {spin.resultHash.slice(0, 16)}...</p>
                <button
                  onClick={() => handleCopy(spin.resultHash, 'Result Hash')}
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-green-400">
                {new Date(spin.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpinHistory;