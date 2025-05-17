import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background-color: #0a0000;
`;

const StyledVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translateX(-50%) translateY(-50%);
  object-fit: cover;
  opacity: 0.85;
  
  @media (max-width: 768px) {
    height: 100%;
    width: 100%;
    object-position: center;
  }
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
  filter: brightness(0.7) contrast(1.2) saturate(1.1);
  
  @media (max-width: 768px) {
    filter: brightness(0.65) contrast(1.2) saturate(1.2);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(10, 0, 0, 0.5), 
    rgba(50, 0, 0, 0.4), 
    rgba(80, 0, 0, 0.3)
  );
  
  @media (max-width: 768px) {
    background: linear-gradient(to bottom, 
      rgba(10, 0, 0, 0.6), 
      rgba(50, 0, 0, 0.5), 
      rgba(80, 0, 0, 0.4)
    );
  }
`;

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
`;

interface ParticleProps {
  top: string;
  left: string;
  size: string;
  opacity: string;
  duration: string;
  delay: string;
}

const Particle = styled.div<ParticleProps>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  background-color: rgba(255, 82, 82, ${props => props.opacity});
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 82, 82, 0.5);
  animation: float ${props => props.duration} ease-in-out infinite;
  animation-delay: ${props => props.delay};
  
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
    100% { transform: translateY(0) rotate(360deg); }
  }
`;

const VideoBackground = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [particles, setParticles] = useState<React.ReactNode[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const generateParticles = () => {
      const particleCount = isMobile ? 15 : 25;
      const newParticles = [];
      
      for (let i = 0; i < particleCount; i++) {
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const size = `${Math.random() * 5 + 2}px`;
        const opacity = `${Math.random() * 0.3 + 0.1}`;
        const duration = `${Math.random() * 15 + 10}s`;
        const delay = `${Math.random() * 5}s`;
        
        newParticles.push(
          <Particle 
            key={i}
            top={top}
            left={left}
            size={size}
            opacity={opacity}
            duration={duration}
            delay={delay}
          />
        );
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
    
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Ошибка автовоспроизведения видео:", error);
        setVideoError(true);
      });
    }
    
    const handleResize = () => {
      generateParticles();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <VideoContainer className="video-container">
      {!videoError && (
        <StyledVideo
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/background.webp"
          onError={() => setVideoError(true)}
        >
          <source src="/background.mp4" type="video/mp4" />
        </StyledVideo>
      )}
      {videoError && <BackgroundImage />}
      <Overlay />
      <ParticleContainer>
        {particles}
      </ParticleContainer>
    </VideoContainer>
  );
};

export default VideoBackground; 