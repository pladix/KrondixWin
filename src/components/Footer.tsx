import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-green-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-medium">KrondixWin</h3>
            <p className="text-sm text-green-300">© 2024 Todos os direitos reservados</p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/pladix"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 hover:text-green-100 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;