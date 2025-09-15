import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import LoginPage from './components/LoginPage';
import { GithubIcon } from './components/icons/GithubIcon';
import { LogoutIcon } from './components/icons/LogoutIcon';
import * as authService from './services/authService';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for a logged-in user when the app loads
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-gray-900 text-white">Cargando...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <header className="py-4 px-6 border-b border-gray-700/50 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-200">
          Chatbot Chente
        </h1>
        {currentUser && (
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Bienvenido, {currentUser}</span>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors"
              aria-label="Cerrar sesión"
            >
              <LogoutIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </header>

      <main className="flex-1 overflow-hidden p-4 md:p-6 lg:p-8">
        {!currentUser ? (
          <div key="login" className="h-full animate-fade-in-up">
            <LoginPage onLoginSuccess={handleLogin} />
          </div>
        ) : (
          <div key="chat" className="h-full animate-fade-in-up">
            <ChatInterface />
          </div>
        )}
      </main>

      <footer className="py-3 px-6 border-t border-gray-700/50 text-center text-sm text-gray-500">
        <div className="flex justify-center items-center gap-4">
          <span>
            by chentoso
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;