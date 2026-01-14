import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { signInAnonymous } from './firebase';
import CreateJoinScreen from './components/CreateJoinScreen';
import PokerTable from './components/PokerTable';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [userName, setUserName] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    // Autenticación anónima al cargar la app
    const authenticate = async () => {
      try {
        await signInAnonymous();
        
        // Recuperar nombre de usuario de localStorage si existe
        const savedName = localStorage.getItem('userName');
        if (savedName) {
          setUserName(savedName);
        }
      } catch (error) {
        console.error('Error en autenticación:', error);
      } finally {
        setIsAuthenticating(false);
      }
    };

    authenticate();
  }, []);

  const handleSetUserName = (name) => {
    setUserName(name);
    localStorage.setItem('userName', name);
  };

  if (isAuthenticating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter basename="/planning-poker">
      <ThemeToggle />
      <Routes>
        <Route 
          path="/" 
          element={<CreateJoinScreen onSetUserName={handleSetUserName} />} 
        />
        <Route 
          path="/room/:roomId" 
          element={<PokerTable userName={userName} />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
