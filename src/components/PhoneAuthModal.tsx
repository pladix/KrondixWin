import React, { useState, useEffect } from 'react';
import { Phone, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import { phoneSchema } from '../types';

interface PhoneAuthModalProps {
  onAuthenticate: (phone: string) => void;
}

const PhoneAuthModal: React.FC<PhoneAuthModalProps> = ({ onAuthenticate }) => {
  const [phone, setPhone] = useState('+55 ');
  const [isValid, setIsValid] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(2);
    
    let formatted = '+55 ';
    
    if (numbers.length > 0) {
      formatted += '(' + numbers.slice(0, 2);
    }
    
    if (numbers.length > 2) {
      formatted += ') ' + numbers.slice(2, 7);
    }
    
    if (numbers.length > 7) {
      formatted += '-' + numbers.slice(7, 11);
    }

    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!value.startsWith('+55')) {
      return;
    }

    const formatted = formatPhoneNumber(value);
    setPhone(formatted);
    
    const digits = formatted.replace(/\D/g, '').slice(2);
    setIsValid(digits.length === 11);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && phone === '+55 ') {
      e.preventDefault();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      phoneSchema.parse(phone);
      onAuthenticate(phone);
    } catch (error) {
      toast.error('Número de telefone inválido!', {
        style: {
          background: '#fee2e2',
          color: '#991b1b',
        },
      });
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-green-950 z-50 flex items-center justify-center p-4">
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

      <div className="bg-green-900/80 backdrop-blur-sm rounded-lg shadow-xl p-8 w-full max-w-md animate-fade-in relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-100 mb-3">KrondixWin</h2>
          <p className="text-green-300">Digite seu número de telefone para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-green-300 mb-2">
              Número de Telefone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                onKeyDown={handleKeyDown}
                placeholder="+55 (00) 00000-0000"
                className="w-full pl-10 pr-4 py-3 bg-green-800/50 backdrop-blur-sm border border-green-700 rounded-lg text-green-100 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                autoFocus
              />
            </div>
            <p className="mt-2 text-sm text-green-400">
              Formato: +55 (XX) XXXXX-XXXX
            </p>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
              isValid
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-800/50 text-green-500 cursor-not-allowed'
            }`}
          >
            <LogIn className="w-5 h-5" />
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhoneAuthModal;