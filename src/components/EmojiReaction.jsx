import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const EMOJIS = ['🎉', '👍', '🔥', '🤔', '💪', '⭐', '❤️', '😂', '🎯', '📄'];

export default function EmojiReactionMenu({ targetUser, onClose, onSelectEmoji, position }) {
  if (!targetUser) return null;

  return (
    <>
      {/* Overlay para cerrar al hacer clic fuera */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Menú de emojis */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 border-2 border-primary dark:border-primary-dark"
        style={{
          left: position?.x || '50%',
          top: position?.y || '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Reaccionar a: <span className="text-primary dark:text-primary-dark">{targetUser.name}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Grid de emojis */}
        <div className="grid grid-cols-5 gap-2">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                onSelectEmoji(emoji, targetUser);
                onClose();
              }}
              className="text-3xl p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-primary-light dark:hover:bg-primary-dark/20 hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label={`Enviar ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
