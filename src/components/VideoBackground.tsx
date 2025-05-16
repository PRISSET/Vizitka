import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Скрываем все возможные интерфейсные элементы */
  &::-webkit-media-controls {
    display: none !important;
  }
  &::-webkit-media-controls-panel {
    display: none !important;
  }
  &::-webkit-media-controls-play-button {
    display: none !important;
  }
  &::-webkit-media-controls-start-playback-button {
    display: none !important;
  }
`;

// Очень прозрачный оверлей, чтобы текст был читаемым
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

// Добавляем космические элементы
const CosmicElement = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 2;
`;

const Planet = styled(CosmicElement)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  top: 15%;
  right: 10%;
  background: radial-gradient(circle at 30% 30%, #8a9bd1, #3a4a8c);
  box-shadow: 0 0 20px rgba(58, 74, 140, 0.7);
  opacity: 0.8;
  animation: floatPlanet 8s infinite ease-in-out;
  
  @keyframes floatPlanet {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(3deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
`;

const Moon = styled(CosmicElement)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: 25%;
  left: 15%;
  background: radial-gradient(circle at 70% 30%, #fff, #ccc);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  opacity: 0.7;
  animation: floatMoon 12s infinite ease-in-out;
  
  @keyframes floatMoon {
    0% { transform: translateY(0) translateX(0); }
    33% { transform: translateY(-10px) translateX(10px); }
    66% { transform: translateY(10px) translateX(-5px); }
    100% { transform: translateY(0) translateX(0); }
  }
`;

const Comet = styled(CosmicElement)`
  width: 4px;
  height: 80px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0));
  transform: rotate(45deg);
  top: 30%;
  left: 25%;
  animation: cometFall 15s infinite linear;
  
  @keyframes cometFall {
    0% { 
      transform: rotate(45deg) translateX(-100vw) translateY(-100vh);
      opacity: 0; 
    }
    5% { opacity: 1; }
    20% { opacity: 1; }
    30% { 
      transform: rotate(45deg) translateX(100vw) translateY(100vh);
      opacity: 0; 
    }
    100% { 
      transform: rotate(45deg) translateX(100vw) translateY(100vh);
      opacity: 0; 
    }
  }
`;

const Asteroid = styled(CosmicElement)`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
  bottom: 35%;
  right: 30%;
  animation: asteroidMove 20s infinite linear;
  
  @keyframes asteroidMove {
    0% { transform: translateX(0) translateY(0) scale(1); }
    25% { transform: translateX(-30px) translateY(20px) scale(1.5); }
    50% { transform: translateX(0) translateY(40px) scale(1); }
    75% { transform: translateX(30px) translateY(20px) scale(0.8); }
    100% { transform: translateX(0) translateY(0) scale(1); }
  }
`;

// Добавляем частицы пыли
const DustParticle = styled(CosmicElement)`
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  opacity: 0.5;
  animation: floatParticle 25s infinite linear;
  
  &:nth-child(1) { top: 15%; left: 10%; animation-delay: 0s; }
  &:nth-child(2) { top: 25%; left: 35%; animation-delay: 2s; }
  &:nth-child(3) { top: 50%; left: 15%; animation-delay: 5s; }
  &:nth-child(4) { top: 70%; left: 65%; animation-delay: 7s; }
  &:nth-child(5) { top: 30%; left: 80%; animation-delay: 11s; }
  &:nth-child(6) { top: 80%; left: 25%; animation-delay: 13s; }
  &:nth-child(7) { top: 40%; left: 50%; animation-delay: 17s; }
  
  @keyframes floatParticle {
    0% { transform: translateX(0) translateY(0); }
    25% { transform: translateX(100px) translateY(-50px); }
    50% { transform: translateX(200px) translateY(0); }
    75% { transform: translateX(100px) translateY(50px); }
    100% { transform: translateX(0) translateY(0); }
  }
`;

// Эффект пульсации
const PulseEffect = styled(CosmicElement)`
  position: absolute;
  width: 0px;
  height: 0px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid rgba(52, 152, 219, 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 8s infinite ease-out;
  z-index: 1;
  
  @keyframes pulse {
    0% { width: 0px; height: 0px; opacity: 1; border-width: 2px; }
    100% { width: 400px; height: 400px; opacity: 0; border-width: 1px; }
  }
`;

const Nebula = styled(CosmicElement)`
  position: absolute;
  width: 300px;
  height: 300px;
  top: 60%;
  left: 80%;
  background: radial-gradient(ellipse at center, rgba(193, 53, 132, 0.2), rgba(58, 120, 221, 0.1), rgba(60, 180, 140, 0.05));
  filter: blur(50px);
  opacity: 0.4;
  animation: nebulaGlow 12s infinite alternate;
  
  @keyframes nebulaGlow {
    0% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(1.1); }
    100% { opacity: 0.2; transform: scale(1); }
  }
`;

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      console.log('Trying to play video');
      
      // Попытка начать воспроизведение как только возможно
      const playVideo = () => {
        video.play().catch(e => {
          console.error('Video play error:', e);
          // Повторная попытка после взаимодействия пользователя
          document.addEventListener('click', () => {
            video.play().catch(err => console.error('Second play attempt failed:', err));
          }, { once: true });
        });
      };
      
      // Воспроизвести видео, когда оно загружено
      if (video.readyState >= 2) { // HAVE_CURRENT_DATA или выше
        playVideo();
      } else {
        video.addEventListener('loadeddata', playVideo);
      }
    }
    
    // Добавляем интерактивный эффект при движении мыши
    const handleMouseMove = (e: MouseEvent) => {
      const stars = document.querySelectorAll<HTMLElement>('.star-element');
      const planet = document.querySelector<HTMLElement>('.planet');
      const moon = document.querySelector<HTMLElement>('.moon');
      
      if (stars.length && planet && moon) {
        const moveX = (e.clientX - window.innerWidth / 2) / 100;
        const moveY = (e.clientY - window.innerHeight / 2) / 100;
        
        stars.forEach((star) => {
          const depth = parseFloat(star.getAttribute('data-depth') || '1');
          star.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
        });
        
        planet.style.transform = `translate(${moveX * -2}px, ${moveY * -2}px) rotate(${moveX}deg)`;
        moon.style.transform = `translate(${moveX * 3}px, ${moveY * 3}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <VideoContainer className="video-container">
      <VideoElement 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoElement>
      <Overlay />
      
      {/* Космические элементы */}
      <Planet className="planet star-element" data-depth="2" />
      <Moon className="moon star-element" data-depth="3" />
      <Comet />
      <Asteroid />
      
      {/* Пульсирующие эффекты */}
      <PulseEffect />
      <PulseEffect style={{ animationDelay: '2s' }} />
      <PulseEffect style={{ animationDelay: '4s' }} />
      
      {/* Частицы космической пыли */}
      <DustParticle className="star-element" data-depth="1.5" />
      <DustParticle className="star-element" data-depth="2.2" />
      <DustParticle className="star-element" data-depth="1.8" />
      <DustParticle className="star-element" data-depth="2.5" />
      <DustParticle className="star-element" data-depth="1.3" />
      <DustParticle className="star-element" data-depth="2.7" />
      <DustParticle className="star-element" data-depth="2.1" />
      
      {/* Туманность */}
      <Nebula />
    </VideoContainer>
  );
};

export default VideoBackground; 