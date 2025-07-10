import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoadingPageProps {
  onLoadingComplete: () => void;
  loadingText?: string;
  duration?: number;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ 
  onLoadingComplete, 
  loadingText = "Preparing your ride...", 
  duration = 3000 
}) => {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Calculate step duration based on total duration
  const stepDuration = duration / 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(onLoadingComplete, 500); // Small delay before callback
          return 100;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, [onLoadingComplete, stepDuration]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: { width: `${progress}%`, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={isComplete ? "exit" : "hidden"}
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          DriveFlow 
        </h1>
        
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-blue-700">
              {loadingText}
            </span>
            <span className="text-sm font-medium text-blue-700">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <motion.div
              ref={progressRef}
              className="h-2.5 rounded-full bg-blue-600"
              variants={progressBarVariants}
              initial="hidden"
              animate="visible"
            />
          </div>
        </div>
        
        {/* Additional loading indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};



export default LoadingPage;