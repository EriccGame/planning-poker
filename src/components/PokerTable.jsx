import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, setDoc, onSnapshot, updateDoc, collection, addDoc, serverTimestamp, query, orderBy, limit, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserCard } from './Card';
import Card from './Card';
import EmojiReactionMenu from './EmojiReaction';
import { RotateCcw, Copy, Check, ArrowLeft, TrendingUp } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const FIBONACCI = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, '?'];

export default function PokerTable({ userName }) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [users, setUsers] = useState({});
  const [copied, setCopied] = useState(false);
  const [average, setAverage] = useState(null);
  
  // Estados para reacciones dirigidas
  const [showReactionMenu, setShowReactionMenu] = useState(false);
  const [targetUser, setTargetUser] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: '50%', y: '50%' });
  const [userReactions, setUserReactions] = useState({});

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

    // Escuchar reacciones dirigidas
    const reactionsRef = collection(db, 'rooms', roomId, 'reactions');
    const reactionsQuery = query(reactionsRef, orderBy('timestamp', 'desc'), limit(50));
    const unsubscribeReactions = onSnapshot(reactionsQuery, (snapshot) => {
      const reactions = {};
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        const targetUserId = data.targetUserId;
        
        if (!reactions[targetUserId]) {
          reactions[targetUserId] = [];
        }
        
        reactions[targetUserId].push({
          id: doc.id,
          ...data,
        });
      });
      
      setUserReactions(reactions);
      
      // Limpiar reacciones antiguas después de 3 segundos
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.timestamp) {
          const reactionTime = data.timestamp.toMillis();
          const now = Date.now();
          if (now - reactionTime > 3000) {
            deleteDoc(doc.ref);
          }
        }
      });
    });

    return () => {
      unsubscribe();
      unsubscribeUsers();
      unsubscribeReactions();
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
    const link = `https://ericcgame.github.io/planning-poker/room/${roomId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Manejar clic en carta de usuario para mostrar menú de reacciones
  const handleUserCardClick = (userId, userName, event) => {
    // Obtener posición del clic
    const rect = event?.target?.getBoundingClientRect();
    if (rect) {
      setMenuPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    
    setTargetUser({ id: userId, name: userName });
    setShowReactionMenu(true);
  };

  // Enviar reacción dirigida a un usuario específico
  const handleSendReaction = async (emoji, targetUser) => {
    const reactionsRef = collection(db, 'rooms', roomId, 'reactions');
    await addDoc(reactionsRef, {
      emoji,
      fromUserId: auth.currentUser?.uid || `user_${Date.now()}`,
      fromUserName: userName,
      targetUserId: targetUser.id,
      targetUserName: targetUser.name,
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
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            💡 Haz clic en la carta de un participante para enviarle una reacción
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.values(users).map((user) => (
              <UserCard
                key={user.id}
                userId={user.id}
                userName={user.name}
                vote={user.vote}
                isRevealed={isRevealed}
                onReactionClick={(userId, userName) => 
                  handleUserCardClick(userId, userName, event)
                }
                reactions={userReactions[user.id] || []}
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
      </div>

      {/* Menú de reacciones */}
      <AnimatePresence>
        {showReactionMenu && (
          <EmojiReactionMenu
            targetUser={targetUser}
            onClose={() => setShowReactionMenu(false)}
            onSelectEmoji={handleSendReaction}
            position={menuPosition}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
