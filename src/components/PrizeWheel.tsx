import React, { useState } from 'react';
import { Play } from 'lucide-react';
import toast from 'react-hot-toast';
import { WHEEL_PRIZES, GameResult } from '../types';
import { generateGameHash, generateResultHash, getRandomPrize, saveGameResult } from '../utils';

interface PrizeWheelProps {
  isManipulated: boolean;
  onSpinComplete: (result: GameResult) => void;
}

const PrizeWheel: React.FC<PrizeWheelProps> = ({ isManipulated, onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spinWheel = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const gameHash = generateGameHash();
    const prize = getRandomPrize(isManipulated, 'wheel');
    const resultHash = generateResultHash(gameHash, prize);

    const result: GameResult = {
      gameHash,
      resultHash,
      prize,
      timestamp: Date.now(),
      isManipulated,
      gameType: 'wheel'
    };

    const prizeIndex = WHEEL_PRIZES.findIndex(p => p.prize === prize);
    const extraSpins = 5;
    const baseAngle = (360 / WHEEL_PRIZES.length);
    const targetRotation = rotation + (360 * extraSpins) + (baseAngle * prizeIndex);
    
    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      saveGameResult(result);
      onSpinComplete(result);
      
      if (prize === 'Tente novamente') {
        toast.error('Não foi dessa vez! Tente novamente!', {
          duration: 3000,
          style: {
            background: '#fee2e2',
            color: '#991b1b',
          },
        });
      } else {
        toast.success(`Parabéns! Você ganhou um ${prize}!`, {
          duration: 3000,
          style: {
            background: '#dcfce7',
            color: '#166534',
          },
        });
      }
    }, 5000);
  };

  return (
    <div className="wheel-container">
      <div className="pointer" />
      <div
        className="wheel"
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {WHEEL_PRIZES.map((segment, index) => {
          const rotation = (360 / WHEEL_PRIZES.length) * index;
          return (
            <div
              key={index}
              className="wheel-section"
              style={{
                transform: `rotate(${rotation}deg)`,
                color: segment.color,
              }}
            >
              <div
                className="prize-content"
                style={{
                  transform: `rotate(${-rotation}deg)`,
                }}
              >
                <span className="prize-icon">{segment.icon}</span>
                <span className="prize-text">{segment.prize}</span>
              </div>
            </div>
          );
        })}
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="spin-button"
        >
          <Play className={`w-8 h-8 ${isSpinning ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default PrizeWheel;