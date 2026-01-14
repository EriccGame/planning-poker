import { motion } from 'framer-motion';

export default function Card({ value, isSelected, isRevealed, onClick, isFlipped = false }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`poker-card ${isSelected ? 'poker-card-selected' : ''} ${
        isFlipped ? 'poker-card-back' : 'poker-card-front'
      }`}
    >
      {isFlipped ? (
        // Carta boca abajo
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/30 animate-pulse-soft" />
        </div>
      ) : (
        // Carta boca arriba
        <div className="text-3xl font-bold text-primary dark:text-primary-dark">
          {value}
        </div>
      )}
    </motion.div>
  );
}

// Componente para la carta de un usuario en la mesa
export function UserCard({ userName, vote, isRevealed }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[100px]">
        {userName}
      </div>
      
      {vote === null ? (
        // Usuario pensando
        <div className="poker-card poker-card-front opacity-50">
          <div className="text-2xl">🤔</div>
        </div>
      ) : isRevealed ? (
        // Carta revelada
        <Card value={vote} isRevealed={true} />
      ) : (
        // Carta boca abajo (votó pero no revelado)
        <Card value={vote} isFlipped={true} />
      )}
      
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {vote === null ? 'Pensando...' : isRevealed ? `Votó: ${vote}` : 'Listo ✓'}
      </div>
    </div>
  );
}
