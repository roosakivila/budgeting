import { motion } from 'framer-motion';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  delay?: number;
}

export const FadeIn = ({ children, delay = 0 }: AnimatedTransitionProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

export const SlideUp = ({ children, delay = 0 }: AnimatedTransitionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

export const SlideIn = ({ children, delay = 0 }: AnimatedTransitionProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
); 