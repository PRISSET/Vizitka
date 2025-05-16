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
  background-image: url("/background_000.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.85) contrast(1.1) saturate(1.2);
`;

// Очень прозрачный оверлей, чтобы текст был читаемым
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
`;

// Контейнер для лепестков сакуры
const SakuraPetalsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
`;

// Лепесток сакуры
const SakuraPetal = styled.div`
  position: absolute;
  border-radius: 150% 0 150% 0;
  transform: rotate(45deg);
  animation-name: sakuraFall, sakuraRotate;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: 1;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
  top: -50px;
  opacity: 0;
  
  &.type1 {
    background-color: rgba(255, 182, 193, 0.7); // Нежно-розовый
  }
  
  &.type2 {
    background-color: rgba(255, 255, 255, 0.8); // Белый
  }
  
  &.type3 {
    background-color: rgba(219, 112, 147, 0.7); // Темно-розовый
  }
  
  &.small {
    width: 8px;
    height: 8px;
    opacity: 0;
  }
  
  &.medium {
    width: 12px;
    height: 12px;
    opacity: 0;
  }
  
  &.large {
    width: 16px;
    height: 16px;
    opacity: 0;
  }
  
  @keyframes sakuraFall {
    0% {
      top: -50px; /* Начало анимации за пределами экрана */
      opacity: 0;
      transform: translateX(0) rotate(45deg);
    }
    5% {
      opacity: 1; /* Постепенное появление */
    }
    25% {
      transform: translateX(calc(10px * var(--direction))) rotate(45deg);
    }
    50% {
      transform: translateX(calc(-10px * var(--direction))) rotate(45deg);
    }
    75% {
      transform: translateX(calc(15px * var(--direction))) rotate(45deg);
    }
    95% {
      opacity: 1; /* Начало исчезновения */
    }
    100% {
      top: 105%; /* Уход за пределы экрана внизу */
      opacity: 0; /* Полное исчезновение */
      transform: translateX(calc(20px * var(--direction))) rotate(45deg);
    }
  }
  
  @keyframes sakuraRotate {
    0% { transform: rotate(45deg); }
    25% { transform: rotate(65deg); }
    50% { transform: rotate(45deg); }
    75% { transform: rotate(25deg); }
    100% { transform: rotate(45deg); }
  }
`;

interface PetalProps {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  direction: number;
  type: string;
  isActive: boolean;
}

const VideoBackground = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sakuraPetals, setSakuraPetals] = useState<PetalProps[]>([]);
  
  // Создаем лепесток с заданной задержкой
  const createPetal = (index: number, delay: number) => {
    return {
      id: index,
      left: `${Math.random() * 100}%`,
      delay: `${delay}s`,
      duration: `${10 + Math.random() * 10}s`,
      size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)],
      direction: Math.random() > 0.5 ? 1 : -1,
      type: [`type1`, `type2`, `type3`][Math.floor(Math.random() * 3)],
      isActive: true
    };
  };
  
  useEffect(() => {
    // Проверка мобильного устройства
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Вызов при загрузке
    checkMobile();
    
    // Слушатель изменения размера экрана
    window.addEventListener('resize', checkMobile);
    
    // Инициализация пустого массива лепестков
    setSakuraPetals([]);
    
    // Постепенно добавляем лепестки с задержкой
    const totalPetals = isMobile ? 15 : 30;
    const interval = setInterval(() => {
      setSakuraPetals(petals => {
        // Если уже достигли нужного количества, прекращаем
        if (petals.length >= totalPetals) {
          clearInterval(interval);
          return petals;
        }
        
        // Добавляем новый лепесток с случайной задержкой
        const newPetal = createPetal(petals.length, Math.random() * 3);
        return [...petals, newPetal];
      });
    }, 300); // Добавляем новый лепесток каждые 300мс
    
    // Функция для замены лепестков, достигших конца анимации
    const replacePetalsInterval = setInterval(() => {
      setSakuraPetals(petals => {
        if (petals.length === 0) return petals;
        
        // Находим произвольный лепесток для замены
        const indexToReplace = Math.floor(Math.random() * petals.length);
        
        // Создаем новый массив, заменяя выбранный лепесток
        return petals.map((petal, index) => {
          if (index === indexToReplace) {
            return createPetal(petal.id, 0); // Немедленное появление нового лепестка
          }
          return petal;
        });
      });
    }, 2000); // Проверяем каждые 2 секунды
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
      clearInterval(replacePetalsInterval);
    };
  }, [isMobile]);

  return (
    <VideoContainer className="video-container">
      <BackgroundImage />
      <Overlay />
      
      {/* Лепестки сакуры */}
      <SakuraPetalsContainer>
        {sakuraPetals.map((petal) => (
          <SakuraPetal
            key={`${petal.id}-${petal.left}`}
            className={`${petal.size} ${petal.type}`}
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: `${petal.duration}, 5s`,
              '--direction': petal.direction
            } as React.CSSProperties}
          />
        ))}
      </SakuraPetalsContainer>
    </VideoContainer>
  );
};

export default VideoBackground; 