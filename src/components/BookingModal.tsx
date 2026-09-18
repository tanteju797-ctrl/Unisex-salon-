import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { BookingSystem } from './BookingSystem';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialHaircutTitle?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  initialHaircutTitle
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#181715]/90 text-[#C8C2B7] hover:text-white border border-[#3A352F] hover:bg-[#201E1B] transition-all cursor-pointer shadow-lg"
            aria-label="Close booking modal"
          >
            <X className="w-4 h-4" />
          </button>

          <BookingSystem
            isModal={true}
            initialServiceId={initialServiceId}
            initialHaircutTitle={initialHaircutTitle}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
