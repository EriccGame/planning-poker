import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, LogIn } from 'lucide-react';
import { generateRoomId } from '../firebase';

export default function CreateJoinScreen({ onSetUserName }) {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [showJoin, setShowJoin] = useState(false);
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (!userName.trim()) {
      alert('Por favor ingresa tu nombre');
      return;
    }
    
    const newRoomId = generateRoomId();
    onSetUserName(userName.trim());
    navigate(`/room/${newRoomId}`);
  };

  const handleJoinRoom = () => {
    if (!userName.trim()) {
      alert('Por favor ingresa tu nombre');
      return;
    }
    
    if (!roomId.trim()) {
      alert('Por favor ingresa el ID de la sala');
      return;
    }
    
    onSetUserName(userName.trim());
    navigate(`/room/${roomId.trim().toUpperCase()}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card-base max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 dark:bg-primary-dark/10 rounded-full">
              <Users className="w-12 h-12 text-primary dark:text-primary-dark" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Planning Poker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Estimación colaborativa para equipos ágiles
          </p>
        </div>

        {/* Formulario */}
        <div className="space-y-6">
          {/* Nombre de usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tu nombre
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ingresa tu nombre"
              className="input-base"
              maxLength={20}
            />
          </div>

          {/* Botones principales */}
          <div className="space-y-3">
            <button
              onClick={handleCreateRoom}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Crear Nueva Sala
            </button>

            <button
              onClick={() => setShowJoin(!showJoin)}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Unirse a una Sala
            </button>
          </div>

          {/* Formulario de unirse */}
          {showJoin && (
            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ID de la Sala
                </label>
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                  placeholder="Ej: AB12"
                  className="input-base text-center text-2xl font-mono tracking-wider"
                  maxLength={4}
                />
              </div>
              <button
                onClick={handleJoinRoom}
                className="btn-primary w-full"
              >
                Entrar a la Sala
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p>Sin registro • Sin contraseñas • 100% Colaborativo</p>
        </div>
      </div>
    </div>
  );
}
