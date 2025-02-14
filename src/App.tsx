import React, { useState, useEffect } from 'react';
import { Gift, Search, Trophy, LogOut } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import MysteryBox from './components/MysteryBox';
import SpinHistory from './components/SpinHistory';
import HashConsult from './components/HashConsult';
import PrizeInfo from './components/PrizeInfo';
import WinNotifications from './components/WinNotifications';
import PhoneAuthModal from './components/PhoneAuthModal';
import Footer from './components/Footer';
import { GameResult, UserData } from './types';
import { loadGameHistory, authenticateUser, saveGameResult } from './utils/storage';

const App: React.FC = () => {
  const [history, setHistory] = useState<GameResult[]>(loadGameHistory());
  const [lastResult, setLastResult] = useState<GameResult | null>(null);
  const [showHashConsult, setShowHashConsult] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(true);

  useEffect(() => {
    const storedPhone = localStorage.getItem('userPhone');
    if (storedPhone) {
      handleAuthentication(storedPhone);
    }
  }, []);

  const handleAuthentication = (phone: string) => {
    try {
      const userData = authenticateUser(phone);
      setUser(userData);
      setShowAuthModal(false);
      localStorage.setItem('userPhone', phone);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setShowAuthModal(true);
    localStorage.removeItem('userPhone');
  };

  const handleGameComplete = (result: GameResult) => {
    setLastResult(result);
    setHistory([result, ...history]);
    if (user) {
      saveGameResult(result, user.phone);
    }
  };

  if (showAuthModal) {
    return (
      <>
        <Toaster position="top-right" />
        <PhoneAuthModal onAuthenticate={handleAuthentication} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-green-950 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              background: `rgba(${Math.random() * 50 + 200}, ${Math.random() * 100 + 155}, ${Math.random() * 50}, ${Math.random() * 0.3 + 0.2})`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 20 + 's'
            }}
          />
        ))}
      </div>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#065f46',
            color: '#ecfdf5',
          },
        }} 
      />
      <WinNotifications />
      <main className="container mx-auto px-4 py-8 relative">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gift className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl text-green-400">KrondixWin</h1>
          </div>
          <p className="text-green-300">Abra as caixas misteriosas e ganhe prêmios incríveis!</p>
          {user && (
            <div className="flex items-center justify-center gap-4 mt-4">
              <p className="text-sm text-green-400">
                Bem-vindo(a)! {user.phone}
              </p>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center space-y-8">
          <button
            onClick={() => setShowHashConsult(!showHashConsult)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm transition-colors flex items-center gap-2"
          >
            {showHashConsult ? (
              <>
                <Gift className="w-4 h-4" />
                Voltar para o Jogo
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Consultar Result Hash
              </>
            )}
          </button>

          {showHashConsult ? (
            <HashConsult history={history} />
          ) : (
            <>
              <MysteryBox
                onPrizeReveal={handleGameComplete}
              />

              {lastResult && (
                <div className="text-center mt-4">
                  <h2 className="text-xl text-green-400 flex items-center justify-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Último Resultado:
                  </h2>
                  <p className="text-2xl mt-2">{lastResult.prize}</p>
                </div>
              )}

              <div className="w-full max-w-md mx-auto space-y-6">
                <PrizeInfo />
                <SpinHistory history={history} />
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;