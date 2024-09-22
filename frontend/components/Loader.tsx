'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  isLoading: boolean;
  onAnimationComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ isLoading, onAnimationComplete }) => {
  const [showLoader, setShowLoader] = useState(true);
  const [typedText, setTypedText] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [canPlayAudio, setCanPlayAudio] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setShowLoader(false), 1000);
    }
  }, [isLoading]);


  const titleText = "TestGenius";

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let charIndex = 0;

    const typeNextChar = () => {
      if (charIndex < titleText.length) {
        setTypedText(titleText.slice(0, charIndex + 1));
        charIndex++;
        
        if (canPlayAudio && audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(e => console.error("Error playing audio:", e));
        }

        timeoutId = setTimeout(typeNextChar, 100);
      }
    };

    if (showLoader) {
      timeoutId = setTimeout(typeNextChar, 500);
    }

    return () => clearTimeout(timeoutId);
  }, [showLoader, canPlayAudio]);

  const handleInteraction = () => {
    setCanPlayAudio(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
  };

  return (
    <AnimatePresence onExitComplete={onAnimationComplete}>
      {showLoader && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-transparent z-50 overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 2.5 }}
          onClick={handleInteraction}
        >
          <div className="relative w-64 h-64">
            <motion.div
              className="absolute inset-0 bg-blue-500 rounded-full"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{
                scale: 20,
                rotate: 720,
                transition: { 
                  duration: 2.5,
                  delay: 0.5,
                  ease: "easeInOut"
                }
              }}
              transition={{
                scale: { duration: 1, ease: "easeInOut" },
                rotate: { duration: 2, ease: "linear" }
              }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #3B82F6 20%, #3B82F6 80%, transparent 80%)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '20% 20%' }}
              />
            </motion.div>
            
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.div
                className="text-3xl font-bold mb-4 text-white"
              >
                {typedText}
              </motion.div>
              <div className="relative w-24 h-24 mb-4">
                <motion.div
                  className="absolute inset-0 border-4 border-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <motion.p
                className="text-center text-sm text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                Preparing your AI-powered tests...
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;