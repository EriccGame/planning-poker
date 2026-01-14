import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, setDoc, onSnapshot, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserCard } from './Card';
import Card from './Card';
import EmojiReaction from './EmojiReaction';
import { RotateCcw, Copy, Check, ArrowLeft, TrendingUp } from 'lucide-react';

const FIBONACCI = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, '?'];

export default function PokerTable({ userName }) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [users, setUsers] = useState({});
  const [copied, setCopied] = useState(false);
  const [average, setAverage] = useState(null);

  useEffect(() => {
    if (!userName) {
      navigate('/');
      return;
    }

    const userId = auth.currentUser?.uid || `user_${Date.now()}`;
    const roomRef = doc(db, 'rooms', roomId);
    const userRef = doc(db, 'rooms', roomId, 'users', userId);

    // Agregar usuario a la sala
    setDoc(userRef, {
      name: userName,
      vote: null,
      joinedAt: serverTimestamp(),
    }, { merge: true });

    // Escuchar cambios en la sala
    const unsubscribe = onSnapshot(roomRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setIsRevealed(data.revealed || false);
      }
    });

    // Escuchar usuarios
    const usersRef = collection(db, 'rooms', roomId, 'users');
    const unsubscribeUsers = onSnapshot(usersRef, (snapshot) => {
      const usersData = {};
      snapshot.forEach((doc) => {
        usersData[doc.id] = { id: doc.id, ...doc.data() };
      });
      setUsers(usersData);
    });

    return () => {
      unsubscribe();
      unsubscribeUsers();
    };
  }, [roomId, userName, navigate]);

  // Calcular promedio cuando se revelan las cartas
  useEffect(() => {
    if (isRevealed) {
      const votes = Object.values(users)
        .map(u => u.vote)
        .filter(v => v !== null && v !== '?' && !isNaN(v));
      
      if (votes.length > 0) {
        const avg = votes.reduce((a, b) => Number(a) + Number(b), 0) / votes.length;
        setAverage(avg.toFixed(1));
      }
    } else {
      setAverage(null);
    }
  }, [isRevealed, users]);

  const handleCardSelect = async (value) => {
    setSelectedCard(value);
    const userId = auth.currentUser?.uid || `user_${Date.now()}`;
    const userRef = doc(db, 'rooms', roomId, 'users', userId);
    
    await updateDoc(userRef, {
      vote: value,
    });
  };

  const handleReveal = async () => {
    const roomRef = doc(db, 'rooms', roomId);
    await setDoc(roomRef, { revealed: true }, { merge: true });
  };

  const handleReset = async () => {
    const roomRef = doc(db, 'rooms', roomId);
    await setDoc(roomRef, { revealed: false }, { merge: true });
    
    // Resetear votos de todos los usuarios
    const usersData = Object.values(users);
    for (const user of usersData) {
      const userRef = doc(db, 'rooms', roomId, 'users', user.id);
      await updateDoc(userRef, { vote: null });
    }
    
    setSelectedCard(null);
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/planning-poker/room/${roomId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReaction = async (emoji) => {
    const reactionsRef = collection(db, 'rooms', roomId, 'reactions');
    await addDoc(reactionsRef, {
      emoji,
      userId: auth.currentUser?.uid || `user_${Date.now()}`,
      userName,
      timestamp: serverTimestamp(),
    });
  };

  const allVoted = Object.values(users).every(u => u.vote !== null);
  const currentUserId = auth.currentUser?.uid || `user_${Date.now()}`;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="card-base">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Sala: {roomId}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {Object.keys(users).length} participante(s)
                </p>
              </div>
            </div>
            
            <button
              onClick={handleCopyLink}
              className="btn-secondary flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar Link'}
            </button>
          </div>
        </div>

        {/* Mesa de usuarios */}
        <div className="card-base">
          <h2 className="text-xl font-semibold mb-4">Participantes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.values(users).map((user) => (
              <UserCard
                key={user.id}
                userName={user.name}
                vote={user.vote}
                isRevealed={isRevealed}
              />
            ))}
          </div>

          {/* Promedio */}
          {isRevealed && average && (
            <div className="mt-6 p-4 bg-success-light dark:bg-success-dark/20 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-success-dark dark:text-success" />
                <span className="text-lg font-semibold">
                  Promedio: {average}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Cartas de votación */}
        <div className="card-base">
          <h2 className="text-xl font-semibold mb-4">Selecciona tu estimación</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {FIBONACCI.map((value) => (
              <Card
                key={value}
                value={value}
                isSelected={selectedCard === value}
                onClick={() => !isRevealed && handleCardSelect(value)}
              />
            ))}
          </div>

          {/* Botones de control */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {!isRevealed && allVoted && (
              <button onClick={handleReveal} className="btn-primary">
                Revelar Cartas
              </button>
            )}
            
            {isRevealed && (
              <button onClick={handleReset} className="btn-secondary flex items-center justify-center gap-2">
                <RotateCcw className="w-5 h-5" />
                Nueva Votación
              </button>
            )}
          </div>
        </div>

        {/* Reacciones */}
        <div className="card-base">
          <h2 className="text-xl font-semibold mb-4 text-center">Reacciones</h2>
          <EmojiReaction onReaction={handleReaction} />
        </div>
      </div>
    </div>
  );
}
