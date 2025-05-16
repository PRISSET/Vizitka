import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
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
`;

const ParallaxLayer = styled.div<{ depth: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${props => props.depth};
  pointer-events: none;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 100px;
  z-index: 1;
  
  &.planet {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #8a9bd1, #3a4a8c);
    opacity: 0.8;
    top: 15%;
    right: 10%;
    animation: floatY 8s infinite ease-in-out;
    box-shadow: 0 0 20px rgba(58, 74, 140, 0.7);
  }
  
  &.comet {
    width: 4px;
    height: 120px;
    background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.8));
    transform: rotate(45deg);
    top: 20%;
    left: 20%;
  }
  
  &.moon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle at 70% 30%, #fff, #ccc);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
    top: 25%;
    left: 75%;
    opacity: 0.7;
  }
  
  &.satellite {
    width: 50px;
    height: 20px;
    background: linear-gradient(45deg, #666, #999);
    border-radius: 10px;
    top: 60%;
    right: 20%;
    opacity: 0.8;
    transform: rotate(-30deg);
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
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
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: 3rem;
  color: var(--light-text-color);
  line-height: 1.8;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
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
`;

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  
  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const layers = heroRef.current.querySelectorAll('.parallax-layer');
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      layers.forEach((layer: Element) => {
        const depth = parseFloat((layer as HTMLElement).dataset.depth || '0');
        const moveX = (mouseX - centerX) * depth;
        const moveY = (mouseY - centerY) * depth;
        
        (layer as HTMLElement).style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
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
      
      <ParallaxLayer depth={0.1} className="parallax-layer" data-depth="0.1">
        <FloatingElement className="planet" />
      </ParallaxLayer>
      
      <ParallaxLayer depth={0.2} className="parallax-layer" data-depth="0.2">
        <FloatingElement className="comet" />
      </ParallaxLayer>
      
      <ParallaxLayer depth={0.15} className="parallax-layer" data-depth="0.15">
        <FloatingElement className="moon" />
      </ParallaxLayer>
      
      <ParallaxLayer depth={0.25} className="parallax-layer" data-depth="0.25">
        <FloatingElement className="satellite" />
      </ParallaxLayer>
      
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
            <span>Назар</span>
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
          >
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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