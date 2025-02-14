import React from 'react';
import { Trophy, DollarSign } from 'lucide-react';

const PrizeInfo: React.FC = () => {
  return (
    <div className="bg-green-900/50 rounded-lg p-6 max-w-md mx-auto mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-bold text-green-100">Prêmios Disponíveis</h2>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between bg-green-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👑</span>
            <span className="text-green-100">Prêmio Lendário</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            <DollarSign className="w-4 h-4" />
            <span>R$ 150</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-green-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌟</span>
            <span className="text-green-100">Prêmio Épico</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            <DollarSign className="w-4 h-4" />
            <span>R$ 80</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-green-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💎</span>
            <span className="text-green-100">Prêmio Raro</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            <DollarSign className="w-4 h-4" />
            <span>R$ 30</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-green-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎁</span>
            <span className="text-green-100">Prêmio Comum</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            <DollarSign className="w-4 h-4" />
            <span>R$ 10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizeInfo;