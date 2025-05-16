import styled from 'styled-components';
import VideoBackground from './components/VideoBackground';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem;
  background: transparent;
`;

const ProfileCard = styled(motion.div)`
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(78, 108, 189, 0.2);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(52, 152, 219, 0.2),
    inset 0 0 20px rgba(52, 152, 219, 0.1);
  padding: 3rem;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  @media (min-width: 768px) {
    text-align: left;
    align-items: flex-start;
    padding: 3rem 4rem;
  }

  /* Добавляем эффект сияния по краям */
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #3498db, transparent, #9b59b6, transparent, #3498db);
    background-size: 400% 400%;
    z-index: -1;
    border-radius: 22px;
    animation: glowingBorder 10s ease infinite;
    opacity: 0.5;
  }

  @keyframes glowingBorder {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const AvatarContainer = styled(motion.div)`
  position: relative;
  width: 180px;
  height: 180px;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    margin-right: 3rem;
    margin-bottom: 0;
  }
`;

const AvatarBorder = styled(motion.div)`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  border: 2px solid #3498db;
  opacity: 0.7;
  z-index: 1;
`;

const AvatarGlow = styled(motion.div)`
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(52, 152, 219, 0.2) 0%, rgba(52, 152, 219, 0) 70%);
  z-index: 0;
`;

const Avatar = styled(motion.div)`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  z-index: 2;
  border: 4px solid #0f172a;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled(motion.h1)`
  font-size: 3.5rem;
  background: linear-gradient(to right, #3498db, #9b59b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin-bottom: 0.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const ProfileTitle = styled(motion.h2)`
  font-size: 1.25rem;
  color: #3498db;
  margin-bottom: 1.5rem;
  font-weight: 500;
  letter-spacing: 1px;
`;

const Divider = styled(motion.div)`
  height: 3px;
  width: 100%;
  background: linear-gradient(to right, rgba(52, 152, 219, 0.8), rgba(155, 89, 182, 0.5));
  margin: 0.5rem 0 2rem;
  border-radius: 2px;
`;

const ProfileDescription = styled(motion.p)`
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  max-width: 650px;
`;

const ProfileStats = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 2rem;
`;

const StatItem = styled(motion.div)`
  flex: 1;
  min-width: 120px;
  text-align: center;
  margin: 1rem;
  padding: 1rem;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 10px;
  border: 1px solid rgba(78, 108, 189, 0.2);
  
  h3 {
    font-size: 2.5rem;
    color: #3498db;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const SocialButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 10px;
  border: 1px solid rgba(78, 108, 189, 0.3);
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  flex: 1;
  max-width: 250px;
  text-align: center;

  &:hover {
    background: rgba(52, 152, 219, 0.3);
    border-color: rgba(52, 152, 219, 0.5);
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.3);
  }

  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    fill: #fff;
  }

  &.instagram:hover {
    background: linear-gradient(45deg, rgba(245, 133, 41, 0.3), rgba(221, 42, 123, 0.3));
    border-color: rgba(221, 42, 123, 0.4);
  }
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  width: 100%;
  justify-content: center;
  gap: 1.5rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Добавляем анимированные декоративные элементы
const FloatingIcon = styled(motion.div)`
  position: absolute;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.2);
  pointer-events: none;
  user-select: none;
  z-index: 0;
`;

function App() {
  const [loading, setLoading] = useState(true);

  // Декоративные элементы (иконки технологий, которые будут плавать в карточке)
  const techIcons = [
    { icon: "⚛️", top: "10%", left: "5%", delay: 0 },
    { icon: "🌐", top: "20%", right: "8%", delay: 1.5 },
    { icon: "📱", bottom: "15%", left: "10%", delay: 2.5 },
    { icon: "💻", bottom: "25%", right: "7%", delay: 3.5 },
    { icon: "🔧", top: "45%", left: "85%", delay: 4.5 }
  ];

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <Preloader /> : (
        <>
          <VideoBackground />
          <AppContainer>
            <ProfileCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Декоративные плавающие иконки */}
              {techIcons.map((item, index) => (
                <FloatingIcon
                  key={index}
                  style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    duration: 5,
                    delay: item.delay,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {item.icon}
                </FloatingIcon>
              ))}
              
              <ProfileHeader>
                <AvatarContainer>
                  <AvatarBorder 
                    animate={{ 
                      rotate: 360
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />
                  <AvatarGlow
                    animate={{ 
                      scale: [1, 1.1, 1], 
                      opacity: [0.7, 0.9, 0.7]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                  <Avatar
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    <img src="/avatar.gif" alt="Назар" />
                  </Avatar>
                </AvatarContainer>
                
                <ProfileInfo>
                  <ProfileName
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                  >
                    Назар
                  </ProfileName>
                  <ProfileTitle
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                  >
                    Front-end Разработчик
                  </ProfileTitle>
                  <Divider 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </ProfileInfo>
              </ProfileHeader>
              
              <ProfileDescription
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                Меня зовут Назар, мне 18 лет. Уже более трёх лет я занимаюсь 
                веб-разработкой, в основном на фронтенде. За это время создал и участвовал 
                в разработке более 20 проектов. Владею HTML, CSS, JavaScript, TypeScript и React.
              </ProfileDescription>
              
              <ProfileDescription
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.9 }}
              >
                Постоянно развиваюсь и стремлюсь к созданию чистого, масштабируемого и эффективного кода.
                Мой подход сочетает творчество и внимание к деталям, что позволяет 
                создавать качественные веб-приложения.
              </ProfileDescription>
              
              <ProfileStats>
                <StatItem
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" }}
                >
                  <h3>3+</h3>
                  <p>Года опыта</p>
                </StatItem>
                <StatItem
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" }}
                >
                  <h3>20+</h3>
                  <p>Проектов</p>
                </StatItem>
                <StatItem
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" }}
                >
                  <h3>5+</h3>
                  <p>Технологий</p>
                </StatItem>
              </ProfileStats>
              
              <SocialButtonsContainer>
                <SocialButton 
                  href="https://t.me/PRISSET" 
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.9 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.064-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Написать в Телеграм
                </SocialButton>
                
                <SocialButton 
                  className="instagram"
                  href="https://www.instagram.com/ratkavai/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                  Написать в Instagram
                </SocialButton>
              </SocialButtonsContainer>
            </ProfileCard>
          </AppContainer>
        </>
      )}
    </>
  );
}

export default App;
