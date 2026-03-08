import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const WelcomeAnimation = ({ onComplete }: WelcomeAnimationProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 800);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center metallic-sheen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Subtle radial glow */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(220, 8%, 25% / 0.4) 0%, transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <div className="text-center relative z-10">
            {/* Brand Name */}
            <motion.h1
              className="font-brand text-7xl md:text-9xl text-gradient-social mb-4"
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              Habibur.bgd
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-muted-foreground text-lg md:text-xl tracking-widest uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Video Blog
            </motion.p>

            {/* Decorative line */}
            <motion.div
              className="mx-auto mt-6 h-[1px] bg-gradient-to-r from-transparent via-metallic-shine to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ duration: 1, delay: 1.6 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeAnimation;
