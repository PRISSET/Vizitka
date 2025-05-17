import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PreloaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  flex-direction: column;
  gap: 1.5rem;
`;

const LoadingText = styled.div`
  font-size: 1.2rem;
  color: var(--light-text-color);
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  margin-top: 1.5rem;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    letter-spacing: 0.2rem;
    margin-top: 1rem;
  }
`;

const starAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
`;

const StarContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  
  @media (max-width: 480px) {
    width: 90px;
    height: 90px;
  }
`;

const Star = styled.div<{ delay: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scale(0);
  opacity: 0;
  background: radial-gradient(circle at center, var(--primary-color), transparent 70%);
  border-radius: 50%;
  animation: ${starAnimation} 2s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  @media (max-width: 480px) {
    animation-duration: 1.8s;
  }
`;

const Preloader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, isMobile ? 2000 : 2500);
    
    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <AnimatePresence>
      {isLoading && (
        <PreloaderContainer
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <StarContainer>
            <Star delay={0} />
            <Star delay={0.4} />
            <Star delay={0.8} />
          </StarContainer>
          <LoadingText>Loading...</LoadingText>
        </PreloaderContainer>
      )}
    </AnimatePresence>
  );
};

export default Preloader; 