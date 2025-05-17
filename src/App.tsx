import styled, { keyframes } from 'styled-components';
import VideoBackground from './components/VideoBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useLanguage } from './i18n/LanguageContext';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem;
  background: transparent;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
    justify-content: flex-start;
  }
`;

const ProfileCard = styled(motion.div)`
  background: rgba(15, 0, 0, 0.75);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 16px;
  border: 1px solid rgba(255, 82, 82, 0.15);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.6),
    0 0 20px rgba(183, 28, 28, 0.15);
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
  
  @media (max-width: 768px) {
    padding: 2rem;
    max-width: 90%;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    max-width: 95%;
    box-shadow: 
      0 5px 15px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(183, 28, 28, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    background: rgba(15, 0, 0, 0.8);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg, 
      transparent, 
      rgba(255, 82, 82, 0.1), 
      transparent
    );
    z-index: 1;
    animation: shine 12s ease-in-out infinite;
    
    @keyframes shine {
      0% { left: -150%; }
      10% { left: 150%; }
      100% { left: 150%; }
    }
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
  
  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 360px) {
    width: 120px;
    height: 120px;
  }
`;

const AvatarBorder = styled(motion.div)`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 82, 82, 0.6);
  opacity: 0.7;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    border: 1px solid rgba(255, 82, 82, 0.3);
    animation: pulse 2s infinite;
    
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.05); opacity: 0.4; }
      100% { transform: scale(1); opacity: 0.7; }
    }
  }
  
  @media (max-width: 480px) {
    border: 2px solid rgba(255, 82, 82, 0.7);
    opacity: 0.8;
    box-shadow: 0 0 15px rgba(183, 28, 28, 0.3);
  }
`;

const AvatarGlow = styled(motion.div)`
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(183, 28, 28, 0.2) 0%, rgba(183, 28, 28, 0) 70%);
  z-index: 0;
  animation: glow 3s ease-in-out infinite alternate;
  
  @keyframes glow {
    0% { opacity: 0.4; }
    100% { opacity: 0.8; }
  }
  
  @media (max-width: 480px) {
    opacity: 0.8;
    background: radial-gradient(circle, rgba(183, 28, 28, 0.3) 0%, rgba(183, 28, 28, 0.1) 50%, rgba(183, 28, 28, 0) 80%);
  }
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
  opacity: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
    border: 3px solid #0f172a;
  }
  
  @media (max-width: 360px) {
    width: 120px;
    height: 120px;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const ProfileName = styled(motion.h1)`
  font-size: 3.5rem;
  position: relative;
  color: #fff;
  margin-bottom: 0.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(to right, #ff5252, #800020);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
    
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 360px) {
    font-size: 2rem;
  }
`;

const ProfileTitle = styled(motion.h2)`
  font-size: 1.25rem;
  color: #ff5252;
  margin-bottom: 1.5rem;
  font-weight: 500;
  letter-spacing: 1px;
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

const Divider = styled(motion.div)`
  height: 1px;
  width: 100%;
  background: linear-gradient(to right, rgba(183, 28, 28, 0.1), rgba(255, 82, 82, 0.5), rgba(183, 28, 28, 0.1));
  margin: 0.5rem 0 2rem;
  
  @media (max-width: 480px) {
    margin: 0.5rem 0 1.5rem;
  }
`;

const ProfileDescription = styled(motion.p)`
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  max-width: 650px;
  
  @media (max-width: 768px) {
    text-align: center;
    margin: 0 auto 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.2rem;
  }
`;

const ProfileStats = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 2rem;
  
  @media (max-width: 480px) {
    margin-top: 1.5rem;
    gap: 0.5rem;
  }
`;

const StatItem = styled(motion.div)`
  flex: 1;
  min-width: 120px;
  text-align: center;
  margin: 1rem;
  padding: 1.2rem;
  background: rgba(15, 0, 0, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(183, 28, 28, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 82, 82, 0.3);
  }
  
  h3 {
    font-size: 2.5rem;
    color: #ff5252;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  @media (max-width: 768px) {
    margin: 0.5rem;
    padding: 0.8rem;
  }
  
  @media (max-width: 480px) {
    h3 {
      font-size: 2rem;
      margin-bottom: 0.3rem;
    }
    
    p {
      font-size: 0.8rem;
    }
  }
`;

const bounce = keyframes`
  0%, 10%, 90%, 100% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-10px);
  }
  30% {
    transform: translateY(-5px);
  }
`;

const SocialButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  background: rgba(15, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(183, 28, 28, 0.2);
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  flex: 1;
  max-width: 250px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(183, 28, 28, 0.2);
    border-color: rgba(255, 82, 82, 0.4);
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.3);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -60%;
    width: 20%;
    height: 200%;
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(30deg);
    transition: all 0.6s ease;
  }
  
  &:hover::after {
    left: 100%;
  }

  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    fill: #fff;
  }

  &.instagram:hover {
    background: linear-gradient(45deg, rgba(183, 28, 28, 0.3), rgba(255, 82, 82, 0.3));
    border-color: rgba(255, 82, 82, 0.4);
  }
  
  &.bounce-button {
    animation: none;
  }
  
  &.bounce-button:nth-child(1) {
    animation: ${bounce} 5s ease infinite;
  }
  
  &.bounce-button:nth-child(2) {
    animation: ${bounce} 5s ease infinite 2.5s;
  }
  
  @media (max-width: 600px) {
    max-width: 100%;
    margin-top: 1rem;
    padding: 0.7rem 1.2rem;
    
    svg {
      width: 20px;
      height: 20px;
    }
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
    margin-top: 1.5rem;
    gap: 1rem;
  }
`;

const TypewriterText = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid #ff5252;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite 0s, hideCaret 0s 3.5s forwards;
  
  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }
  
  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: #ff5252 }
  }
  
  @keyframes hideCaret {
    to { border-color: transparent }
  }
`;

function App() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showDivider, setShowDivider] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    
    const timer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
      
      // Последовательно показываем элементы
      setTimeout(() => setShowAvatar(true), 500);
      setTimeout(() => setShowName(true), 1500);
      setTimeout(() => setShowTitle(true), 2000);
      setTimeout(() => setShowDivider(true), 2300);
      setTimeout(() => setShowBio(true), 2600);
      setTimeout(() => setShowStats(true), 3200);
      setTimeout(() => setShowButtons(true), 3800);
    }, isMobile ? 1200 : 2000);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <AppContainer>
          <VideoBackground />
          <LanguageSwitcher />
          <AnimatePresence>
            {showContent && (
              <ProfileCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
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
                      animate={showAvatar ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    >
                      <img src="/avatar.gif" alt="PRISSET" />
                    </Avatar>
                  </AvatarContainer>
                  
                  <ProfileInfo>
                    <ProfileName
                      animate={showName ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                      transition={{ duration: 0.7 }}
                    >
                      {showName && <TypewriterText>PRISSET</TypewriterText>}
                    </ProfileName>
                    <ProfileTitle
                      animate={showTitle ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.7 }}
                    >
                      {t.profileTitle}
                    </ProfileTitle>
                    <Divider 
                      animate={showDivider ? { width: "100%" } : { width: 0 }}
                      transition={{ duration: 1 }}
                    />
                  </ProfileInfo>
                </ProfileHeader>
                
                <ProfileDescription
                  animate={showBio ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  {t.bio1}
                </ProfileDescription>
                
                <ProfileDescription
                  animate={showBio ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  {t.bio2}
                </ProfileDescription>
                
                <ProfileStats>
                  <StatItem
                    animate={showStats ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" }}
                  >
                    <h3>3+</h3>
                    <p>{t.yearsExperience}</p>
                  </StatItem>
                  <StatItem
                    animate={showStats ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" }}
                  >
                    <h3>20+</h3>
                    <p>{t.projects}</p>
                  </StatItem>
                  <StatItem
                    animate={showStats ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" }}
                  >
                    <h3>5+</h3>
                    <p>{t.technologies}</p>
                  </StatItem>
                </ProfileStats>
                
                <SocialButtonsContainer>
                  <SocialButton 
                    href="https://t.me/PRISSET" 
                    target="_blank"
                    rel="noopener noreferrer"
                    animate={showButtons ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bounce-button"
                  >
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.064-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    {t.telegramButton}
                  </SocialButton>
                  
                  <SocialButton 
                    className="instagram bounce-button"
                    href="https://www.instagram.com/ratkavai/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    animate={showButtons ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                    {t.instagramButton}
                  </SocialButton>
                </SocialButtonsContainer>
              </ProfileCard>
            )}
          </AnimatePresence>
        </AppContainer>
      )}
    </>
  );
}

export default App;
