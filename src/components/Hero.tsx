import { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding-top: 4rem;
    min-height: calc(100vh - 2rem);
    justify-content: flex-start;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
    padding-top: 4rem;
  }
`;

const StarField = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  
  .star {
    position: absolute;
    background-color: #fff;
    border-radius: 50%;
    opacity: 0.5;
    animation: twinkling 3s infinite ease-in-out;
  }
  
  .star:nth-child(1) { top: 10%; left: 20%; width: 2px; height: 2px; animation-delay: 0.1s; }
  .star:nth-child(2) { top: 15%; left: 40%; width: 1px; height: 1px; animation-delay: 0.3s; }
  .star:nth-child(3) { top: 25%; left: 65%; width: 3px; height: 3px; animation-delay: 0.5s; }
  .star:nth-child(4) { top: 40%; left: 80%; width: 2px; height: 2px; animation-delay: 0.7s; }
  .star:nth-child(5) { top: 60%; left: 30%; width: 1px; height: 1px; animation-delay: 0.9s; }
  .star:nth-child(6) { top: 70%; left: 70%; width: 2px; height: 2px; animation-delay: 1.1s; }
  .star:nth-child(7) { top: 80%; left: 10%; width: 3px; height: 3px; animation-delay: 1.3s; }
  .star:nth-child(8) { top: 5%; left: 50%; width: 2px; height: 2px; animation-delay: 1.5s; }
  .star:nth-child(9) { top: 35%; left: 85%; width: 1px; height: 1px; animation-delay: 1.7s; }
  .star:nth-child(10) { top: 45%; left: 15%; width: 2px; height: 2px; animation-delay: 1.9s; }
  .star:nth-child(11) { top: 65%; left: 45%; width: 3px; height: 3px; animation-delay: 2.1s; }
  .star:nth-child(12) { top: 75%; left: 75%; width: 1px; height: 1px; animation-delay: 2.3s; }
  .star:nth-child(13) { top: 85%; left: 25%; width: 2px; height: 2px; animation-delay: 2.5s; }
  .star:nth-child(14) { top: 90%; left: 90%; width: 3px; height: 3px; animation-delay: 2.7s; }
  .star:nth-child(15) { top: 20%; left: 5%; width: 2px; height: 2px; animation-delay: 2.9s; }
  
  @media (max-width: 480px) {
    .star {
      opacity: 0.3;
    }
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    width: 100%;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

const GlassCard = styled(motion.div)`
  background: var(--blur-background);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  padding: 3rem;
  max-width: 600px;
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin: 0 auto;
    width: 100%;
    background: rgba(23, 32, 56, 0.6);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.5);
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    max-width: 100%;
    margin: 0;
    border: 1px solid rgba(52, 152, 219, 0.2);
    background: rgba(23, 32, 56, 0.65);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.5),
      0 0 15px rgba(52, 152, 219, 0.2);
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  margin-bottom: 2rem;
  line-height: 1.1;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  span {
    color: var(--primary-color);
    display: block;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
    font-size: clamp(2rem, 5vw, 2.5rem);
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: 3rem;
  color: var(--light-text-color);
  line-height: 1.8;
  
  @media (max-width: 480px) {
    margin-bottom: 2rem;
    line-height: 1.6;
    font-size: 0.95rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    gap: 0.8rem;
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styled(motion.button)`
  background-color: var(--primary-color);
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    padding: 0.7rem 1.5rem;
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 2rem;
  border: 2px solid var(--primary-color);
  border-radius: 50px;
  color: var(--light-text-color);
  font-weight: 600;
  cursor: pointer;
  background: rgba(52, 152, 219, 0.1);
  
  &:hover {
    background-color: rgba(52, 152, 219, 0.3);
    transform: translateY(-2px);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    padding: 0.7rem 1.5rem;
  }
`;

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  
  return (
    <HeroSection id="hero" ref={heroRef}>
      <StarField>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </StarField>
      
      <HeroContent>
        <GlassCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Привет, я 
            <span>PRISSET</span>
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Фронтенд-разработчик с более чем трёхлетним опытом создания современных, отзывчивых и удобных веб-приложений с использованием React.
          </Subtitle>
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="button-group"
          >
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ 
                y: { 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 1.5, 
                  repeatDelay: 3.5 
                },
                scale: { duration: 0.2 }
              }}
              onClick={() => {
                const about = document.getElementById('about');
                if (about) about.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Мои навыки
            </Button>
            <SecondaryButton 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ 
                y: { 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 1.5, 
                  repeatDelay: 3.5 
                },
                scale: { duration: 0.2 }
              }}
            >
              GitHub
            </SecondaryButton>
          </ButtonGroup>
        </GlassCard>
      </HeroContent>
    </HeroSection>
  );
}

export default Hero; 