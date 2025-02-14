import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { BOX_PRIZES } from '../types';

const fakeNames = [
  'João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Rodrigues', 'Lucas Ferreira',
  'Julia Costa', 'Gabriel Souza', 'Beatriz Lima', 'Rafael Pereira', 'Carolina Almeida',
  'Thiago Carvalho', 'Mariana Ribeiro', 'Bruno Martins', 'Larissa Gomes', 'Felipe Santos',
  'Amanda Oliveira', 'Diego Fernandes', 'Camila Castro', 'Rodrigo Barbosa', 'Isabella Silva',
  'Matheus Lima', 'Sophia Pereira', 'Leonardo Costa', 'Valentina Santos', 'Enzo Rodrigues',
  'Laura Ferreira', 'Guilherme Alves', 'Manuela Sousa', 'Arthur Carvalho', 'Helena Lima',
  'Davi Oliveira', 'Alice Martins', 'Bernardo Silva', 'Clara Santos', 'Samuel Pereira',
  'Cecília Costa', 'Miguel Fernandes', 'Luiza Barbosa', 'Heitor Almeida', 'Isadora Lima'
];

const WinNotifications: React.FC = () => {
  useEffect(() => {
    const showFakeWin = () => {
      const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
      const prizes = BOX_PRIZES.filter(prize => prize.prize !== 'Tente novamente');
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      
      const prizeValues: Record<string, number> = {
        'Prêmio Lendário': 150,
        'Prêmio Épico': 80,
        'Prêmio Raro': 30,
        'Prêmio Comum': 10
      };

      const value = prizeValues[randomPrize.prize];
      
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-green-900 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 pt-0.5">
                  <span className="text-2xl">{randomPrize.icon}</span>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-green-100">
                    {randomName} ganhou agora!
                  </p>
                  <p className="mt-1 text-sm text-green-300">
                    {randomPrize.prize} - Pix de R$ {value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
        { duration: 3000 }
      );
    };

    // Show first notification after 5 seconds
    const initialTimeout = setTimeout(() => {
      showFakeWin();
      // Then show notifications randomly between 5-15 seconds
      const interval = setInterval(() => {
        showFakeWin();
      }, Math.random() * (15000 - 5000) + 5000);

      return () => clearInterval(interval);
    }, 5000);

    return () => clearTimeout(initialTimeout);
  }, []);

  return null;
};

export default WinNotifications