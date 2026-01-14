import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const EMOJIS = ['🎉', '👍', '🔥', '🤔'];

export default function EmojiReaction({ onReaction }) {
  const [floatingEmojis, setFloatingEmojis] = useState([]);

  const handleEmojiClick = (emoji) => {
    // Crear emoji flotante con ID único
    const id = Date.now() + Math.random();
    const newEmoji = {
      id,
      emoji,
      x: Math.random() * 100, // Posición X aleatoria (0-100%)
    };

    setFloatingEmojis(prev => [...prev, newEmoji]);

    // Notificar a otros usuarios (Firebase)
    if (onReaction) {
      onReaction(emoji);
    }

    // Remover después de la animación
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== id));
    }, 2000);
  };

  return (
    <>
      {/* Botones de emojis */}
      <div className="flex gap-2 justify-center">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleEmojiClick(emoji)}
            className="text-3xl p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label={`Reaccionar con ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Emojis flotantes */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <AnimatePresence>
          {floatingEmojis.map((item) => (
            <motion.div
              key={item.id}
              initial={{ y: 0, opacity: 1, scale: 1 }}
              animate={{ y: -100, opacity: 0, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="absolute bottom-20 text-5xl"
              style={{ left: `${item.x}%` }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

// Hook para recibir reacciones de otros usuarios
export function useEmojiReactions(roomId, db) {
  const [reactions, setReactions] = useState([]);

  // Este hook se conectaría a Firebase para escuchar reacciones
  // Por ahora es un placeholder para la estructura
  
  return reactions;
}
