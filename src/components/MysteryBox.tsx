import React, { useState } from 'react';
import { Package, Sparkles, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { BOX_PRIZES, GameResult } from '../types';
import { generateGameHash, generateResultHash, getRandomPrize } from '../utils';

interface MysteryBoxProps {
  onPrizeReveal: (result: GameResult) => void;
}

const MysteryBox: React.FC<MysteryBoxProps> = ({ onPrizeReveal }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [openedBox, setOpenedBox] = useState<{ index: number; prize: string | null }>({ index: -1, prize: null });
  const [allPrizes, setAllPrizes] = useState<(string | null)[]>(Array(9).fill(null));

  const resetBoxes = () => {
    setOpenedBox({ index: -1, prize: null });
    setAllPrizes(Array(9).fill(null));
  };

  const generateRandomPrizes = (selectedIndex: number, selectedPrize: string) => {
    const prizes = [...Array(9)].map((_, index) => {
      if (index === selectedIndex) return selectedPrize;
      
      const random = Math.random() * 100;
      if (random < 40) return 'Tente novamente';
      if (random < 70) return 'Prêmio Comum';
      if (random < 85) return 'Prêmio Raro';
      if (random < 95) return 'Prêmio Épico';
      return 'Prêmio Lendário';
    });
    return prizes;
  };

  const openBox = async (boxIndex: number) => {
    if (isOpening || openedBox.index !== -1) return;

    setIsOpening(true);
    const gameHash = generateGameHash();
    const isManipulated = import.meta.env.VITE_GAME_MANIPULATION === 'true';
    const prize = getRandomPrize(isManipulated, 'box');
    const resultHash = generateResultHash(gameHash, prize);

    const result: GameResult = {
      gameHash,
      resultHash,
      prize,
      timestamp: Date.now(),
      isManipulated,
      gameType: 'box'
    };

    const allBoxPrizes = generateRandomPrizes(boxIndex, prize);
    
    setTimeout(() => {
      setIsOpening(false);
      setOpenedBox({ index: boxIndex, prize });
      
      setAllPrizes(prev => {
        const newPrizes = [...prev];
        newPrizes[boxIndex] = prize;
        return newPrizes;
      });

      const revealDelay = 100;
      allBoxPrizes.forEach((boxPrize, index) => {
        if (index !== boxIndex) {
          setTimeout(() => {
            setAllPrizes(prev => {
              const newPrizes = [...prev];
              newPrizes[index] = boxPrize;
              return newPrizes;
            });
          }, revealDelay * (index + 1));
        }
      });

      onPrizeReveal(result);
      
      if (prize === 'Tente novamente') {
        toast.error('Caixa vazia! Tente novamente!', {
          duration: 3000,
          style: {
            background: '#fee2e2',
            color: '#991b1b',
          },
        });
      } else {
        toast.success(`Parabéns! Você encontrou um ${prize}!`, {
          duration: 3000,
          style: {
            background: '#dcfce7',
            color: '#166534',
          },
        });
      }
    }, 1500);
  };

  const getPrizeColor = (prize: string) => {
    const prizeData = BOX_PRIZES.find(p => p.prize === prize);
    return prizeData?.color || '#4a5568';
  };

  const getPrizeIcon = (prize: string) => {
    const prizeData = BOX_PRIZES.find(p => p.prize === prize);
    return prizeData?.icon || '📦';
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 w-full">
        {Array.from({ length: 9 }).map((_, index) => {
          const isBoxOpened = openedBox.index !== -1;
          const isSelectedBox = openedBox.index === index;
          const currentPrize = allPrizes[index];
          const hasPrize = currentPrize && currentPrize !== 'Tente novamente';
          
          return (
            <button
              key={index}
              onClick={() => openBox(index)}
              disabled={isOpening || isBoxOpened}
              className={`
                relative aspect-square rounded-lg shadow-xl transition-all duration-300
                transform hover:scale-105 active:scale-95
                flex items-center justify-center
                border-2 sm:border-4
                ${currentPrize
                  ? hasPrize
                    ? `bg-gradient-to-br from-${getPrizeColor(currentPrize).slice(1)}-400 to-${getPrizeColor(currentPrize).slice(1)}-600 border-${getPrizeColor(currentPrize).slice(1)}-300/50`
                    : 'bg-gradient-to-br from-gray-700 to-gray-900 border-gray-600/20'
                  : 'bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 border-yellow-300/20 cursor-pointer'}
                ${isSelectedBox ? 'ring-4 ring-white ring-opacity-50' : ''}
              `}
            >
              {currentPrize ? (
                hasPrize ? (
                  <div className="flex flex-col items-center gap-1 sm:gap-2 p-1 sm:p-2 animate-fade-in">
                    <span className="text-2xl sm:text-4xl">{getPrizeIcon(currentPrize)}</span>
                    <span className="text-[10px] sm:text-xs font-bold text-white text-center leading-tight">
                      {currentPrize}
                    </span>
                  </div>
                ) : (
                  <X className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 animate-fade-in" />
                )
              ) : (
                <Package 
                  className={`w-8 h-8 sm:w-12 sm:h-12 text-yellow-100 ${
                    isOpening ? 'animate-bounce' : 'animate-pulse'
                  }`}
                />
              )}
              {!currentPrize && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
              )}
            </button>
          );
        })}
      </div>
      
      {openedBox.index !== -1 && (
        <button
          onClick={resetBoxes}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors"
        >
          Tentar Novamente
        </button>
      )}
    </div>
  );
};

export default MysteryBox;