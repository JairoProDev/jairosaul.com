'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface Transition3DProps {
  isVisible: boolean;
  onClose: () => void;
  targetPath: string;
}

export default function Transition3D({ isVisible, onClose, targetPath }: Transition3DProps) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isVisible && !isTransitioning) {
      setIsTransitioning(true);
      
      // Simular transición 3D
      setTimeout(() => {
        router.push(targetPath);
        onClose();
        setIsTransitioning(false);
      }, 1500);
    }
  }, [isVisible, targetPath, router, onClose, isTransitioning]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-cortex-900 flex items-center justify-center"
        >
          <div className="text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 mx-auto mb-8"
            >
              {/* Animación de cerebro */}
              <div className="relative w-full h-full">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="w-full h-full bg-gradient-to-r from-acetylcholine-500 to-dopamine-500 rounded-full opacity-20"
                />
                <motion.div
                  animate={{
                    rotate: -360,
                    scale: [1, 0.8, 1],
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute inset-4 bg-gradient-to-r from-serotonin-500 to-glutamate-500 rounded-full opacity-30"
                />
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-4"
            >
              Estableciendo Sinapsis...
            </motion.h2>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-cortex-300"
            >
              Conectando con la región cerebral seleccionada
            </motion.p>
            
            {/* Barra de progreso */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="mt-8 h-1 bg-gradient-to-r from-acetylcholine-500 to-dopamine-500 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
