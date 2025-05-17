import { useEffect, useState } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/background.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.85) contrast(1.1) saturate(1.2);
  
  @media (max-width: 768px) {
    filter: brightness(0.75) contrast(1.15) saturate(1.3);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0.3), 
    rgba(20, 20, 50, 0.3), 
    rgba(50, 30, 60, 0.3)
  );
  
  @media (max-width: 768px) {
    background: linear-gradient(to bottom, 
      rgba(0, 0, 0, 0.35), 
      rgba(20, 20, 50, 0.35), 
      rgba(50, 30, 60, 0.4)
    );
  }
`;

const SnowContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
`;

const Snowflake = styled.div`
  position: absolute;
  border-radius: 50%;
  animation-name: snowFall, snowSway, glowPulse;
  animation-timing-function: linear, ease-in-out, ease-in-out;
  animation-iteration-count: 1, 1, infinite;
  top: -10px;
  opacity: 0;
  
  &.type1 {
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.7), 0 0 10px 4px rgba(200, 220, 255, 0.3);
  }
  
  &.type2 {
    background-color: rgba(240, 248, 255, 0.9);
    box-shadow: 0 0 8px 3px rgba(210, 235, 255, 0.8), 0 0 12px 5px rgba(180, 215, 255, 0.4);
  }
  
  &.type3 {
    background-color: rgba(220, 240, 255, 0.95);
    box-shadow: 0 0 7px 2px rgba(200, 225, 255, 0.8), 0 0 15px 6px rgba(150, 200, 255, 0.3);
  }
  
  &.type4 {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 30%, rgba(230, 240, 255, 0.6) 100%);
    box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.7), 0 0 18px 8px rgba(170, 210, 255, 0.4);
  }
  
  &.type5 {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 20%, rgba(210, 230, 255, 0.7) 90%);
    box-shadow: 0 0 8px 4px rgba(200, 225, 255, 0.7), 0 0 16px 7px rgba(160, 205, 255, 0.4);
  }
  
  &.special {
    background: radial-gradient(circle, rgba(255, 255, 255, 1) 10%, rgba(190, 225, 255, 0.8) 70%, rgba(150, 200, 255, 0.6) 100%);
    box-shadow: 0 0 12px 5px rgba(220, 240, 255, 0.9), 0 0 20px 10px rgba(130, 190, 255, 0.5);
    animation-name: snowFall, snowSway, specialGlow;
  }
  
  &.tiny {
    width: 2px;
    height: 2px;
    opacity: 0;
  }
  
  &.small {
    width: 4px;
    height: 4px;
    opacity: 0;
  }
  
  &.medium {
    width: 6px;
    height: 6px;
    opacity: 0;
  }
  
  &.large {
    width: 9px;
    height: 9px;
    opacity: 0;
  }
  
  &.xlarge {
    width: 12px;
    height: 12px;
    opacity: 0;
  }
  
  @keyframes snowFall {
    0% {
      top: -10px;
      opacity: 0;
      transform: translateX(0);
    }
    3% {
      opacity: 0.9;
    }
    90% {
      opacity: 0.9;
    }
    100% {
      top: calc(100vh + 20px);
      opacity: 0.9;
      transform: translateX(calc(var(--drift) * 1px));
    }
  }
  
  @keyframes snowSway {
    0% { transform: translateX(0); }
    25% { transform: translateX(calc(var(--sway) * 1px)); }
    50% { transform: translateX(0); }
    75% { transform: translateX(calc(var(--sway) * -0.8px)); }
    100% { transform: translateX(0); }
  }
  
  @keyframes glowPulse {
    0% { filter: brightness(1) blur(0px); }
    50% { filter: brightness(1.2) blur(0.5px); }
    100% { filter: brightness(1) blur(0px); }
  }
  
  @keyframes specialGlow {
    0% { filter: brightness(1) blur(0px); box-shadow: 0 0 12px 5px rgba(220, 240, 255, 0.9), 0 0 20px 10px rgba(130, 190, 255, 0.5); }
    25% { filter: brightness(1.3) blur(1px); box-shadow: 0 0 15px 7px rgba(220, 240, 255, 0.95), 0 0 25px 12px rgba(130, 190, 255, 0.6); }
    50% { filter: brightness(1.5) blur(1.5px); box-shadow: 0 0 18px 8px rgba(230, 245, 255, 1), 0 0 30px 15px rgba(150, 200, 255, 0.7); }
    75% { filter: brightness(1.3) blur(1px); box-shadow: 0 0 15px 7px rgba(220, 240, 255, 0.95), 0 0 25px 12px rgba(130, 190, 255, 0.6); }
    100% { filter: brightness(1) blur(0px); box-shadow: 0 0 12px 5px rgba(220, 240, 255, 0.9), 0 0 20px 10px rgba(130, 190, 255, 0.5); }
  }
`;

interface SnowflakeProps {
  id: number;
  left: string;
  delay: string;
  fallDuration: string;
  swayDuration: string;
  glowDuration: string;
  size: string;
  drift: number;
  sway: number;
  type: string;
}

const VideoBackground = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [snowflakes, setSnowflakes] = useState<SnowflakeProps[]>([]);
  
  const createSnowflake = (index: number, delay: number) => {
    const sizeOptions = ['tiny', 'small', 'small', 'medium', 'medium', 'medium', 'large', 'large', 'xlarge'];
    const randomSize = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
    
    let fallSpeed;
    switch(randomSize) {
      case 'tiny': fallSpeed = 20 + Math.random() * 10; break;
      case 'small': fallSpeed = 18 + Math.random() * 10; break;
      case 'medium': fallSpeed = 15 + Math.random() * 8; break;
      case 'large': fallSpeed = 12 + Math.random() * 8; break;
      case 'xlarge': fallSpeed = 10 + Math.random() * 6; break;
      default: fallSpeed = 15 + Math.random() * 10;
    }
    
    const typeOptions = ['type1', 'type1', 'type2', 'type2', 'type3', 'type3', 'type4', 'type5'];
    const isSpecial = Math.random() < 0.05;
    const randomType = isSpecial ? 'special' : typeOptions[Math.floor(Math.random() * typeOptions.length)];
    
    const glowDuration = `${2 + Math.random() * 4}s`;
    
    return {
      id: index,
      left: `${Math.random() * 100}%`,
      delay: `${delay}s`,
      fallDuration: `${fallSpeed}s`,
      swayDuration: `${6 + Math.random() * 8}s`,
      glowDuration,
      size: randomSize,
      drift: Math.floor(Math.random() * 100) - 50,
      sway: Math.floor(10 + Math.random() * 25),
      type: randomType
    };
  };
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    
    setSnowflakes([]);
    
    const totalSnowflakes = isMobile ? 80 : 150;
    const interval = setInterval(() => {
      setSnowflakes(flakes => {
        if (flakes.length >= totalSnowflakes) {
          clearInterval(interval);
          return flakes;
        }
        
        const newSnowflake = createSnowflake(flakes.length, Math.random() * 10);
        return [...flakes, newSnowflake];
      });
    }, isMobile ? 100 : 50);
    
    const replaceSnowflakeInterval = setInterval(() => {
      setSnowflakes(flakes => {
        if (flakes.length === 0) return flakes;
        
        const numToReplace = Math.floor(Math.random() * 5) + 1;
        const newFlakes = [...flakes];
        
        for (let i = 0; i < numToReplace; i++) {
          const indexToReplace = Math.floor(Math.random() * flakes.length);
          newFlakes[indexToReplace] = createSnowflake(flakes[indexToReplace].id, 0);
        }
        
        return newFlakes;
      });
    }, isMobile ? 1000 : 800);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
      clearInterval(replaceSnowflakeInterval);
    };
  }, [isMobile]);

  return (
    <VideoContainer className="video-container">
      <BackgroundImage />
      <Overlay />
      
      <SnowContainer>
        {snowflakes.map((flake) => (
          <Snowflake
            key={`${flake.id}-${flake.left}`}
            className={`${flake.size} ${flake.type}`}
            style={{
              left: flake.left,
              animationDelay: flake.delay,
              animationDuration: `${flake.fallDuration}, ${flake.swayDuration}, ${flake.glowDuration}`,
              '--drift': flake.drift,
              '--sway': flake.sway
            } as React.CSSProperties}
          />
        ))}
      </SnowContainer>
    </VideoContainer>
  );
};

export default VideoBackground; 