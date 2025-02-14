import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { SpinResult } from '../types';

interface HashConsultProps {
  history: SpinResult[];
}

const HashConsult: React.FC<HashConsultProps> = ({ history }) => {
  const [searchHash, setSearchHash] = useState('');
  const [searchResult, setSearchResult] = useState<SpinResult | null>(null);

  const handleSearch = () => {
    const result = history.find(
      item => item.gameHash.includes(searchHash) || item.resultHash.includes(searchHash)
    );
    setSearchResult(result || null);
  };

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

  const formatHash = (hash: string) => `${hash.slice(0, 8)}...${hash.slice(-8)}`;

  return (
    <div className="w-full max-w-2xl mx-auto bg-green-900 rounded-lg shadow-xl p-6">
      <h2 className="text-2xl text-green-100 mb-6">Consulta de Hash</h2>
      
      <div className="space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={searchHash}
            onChange={(e) => setSearchHash(e.target.value)}
            placeholder="Digite o Game Hash ou Result Hash"
            className="flex-1 px-4 py-2 rounded-lg bg-green-800 text-green-100 placeholder-green-400 border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            Buscar
          </button>
        </div>

        {searchResult ? (
          <div className="mt-6 bg-green-800 p-6 rounded-lg">
            <h3 className="text-xl text-green-100 mb-4">Resultado Encontrado</h3>
            <div className="space-y-2">
              <p><span className="text-green-400">Data/Hora:</span> {new Date(searchResult.timestamp).toLocaleString()}</p>
              <div className="flex items-center gap-2">
                <p><span className="text-green-400">Game Hash:</span> {formatHash(searchResult.gameHash)}</p>
                <button
                  onClick={() => handleCopy(searchResult.gameHash, 'Game Hash')}
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <p><span className="text-green-400">Result Hash:</span> {formatHash(searchResult.resultHash)}</p>
                <button
                  onClick={() => handleCopy(searchResult.resultHash, 'Result Hash')}
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p><span className="text-green-400">Resultado:</span> {searchResult.prize}</p>
              <p><span className="text-green-400">Status:</span> {
                searchResult.prize === 'Tente novamente' ? 
                <span className="text-red-400">Perdeu</span> : 
                <span className="text-green-400">Ganhou</span>
              }</p>
            </div>
          </div>
        ) : searchHash && (
          <div className="mt-6 bg-green-800 p-6 rounded-lg text-center">
            <p className="text-yellow-400">Nenhum resultado encontrado para este hash.</p>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-xl text-green-100 mb-4">Últimas Jogadas</h3>
          <div className="space-y-4">
            {history.slice(0, 5).map((item, index) => (
              <div key={index} className="bg-green-800 p-4 rounded-lg">
                <p><span className="text-green-400">Data/Hora:</span> {new Date(item.timestamp).toLocaleString()}</p>
                <div className="flex items-center gap-2">
                  <p><span className="text-green-400">Game Hash:</span> {formatHash(item.gameHash)}</p>
                  <button
                    onClick={() => handleCopy(item.gameHash, 'Game Hash')}
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <p><span className="text-green-400">Result Hash:</span> {formatHash(item.resultHash)}</p>
                  <button
                    onClick={() => handleCopy(item.resultHash, 'Result Hash')}
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p><span className="text-green-400">Resultado:</span> {item.prize}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashConsult;