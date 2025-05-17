import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

const SwitcherContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  gap: 10px;
  background: linear-gradient(135deg, rgba(15, 0, 0, 0.3), rgba(139, 0, 0, 0.2), rgba(183, 28, 28, 0.25));
  background-size: 300% 100%;
  animation: gradientSwitch 10s ease infinite;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 30px;
  padding: 8px;
  border: 1px solid rgba(183, 28, 28, 0.2);
  box-shadow: 
    0 4px 10px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(183, 28, 28, 0.2);
  overflow: hidden;
    
  @keyframes gradientSwitch {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @media (max-width: 768px) {
    top: auto;
    bottom: 20px;
    right: 20px;
    padding: 6px;
  }
  
  @media (max-width: 480px) {
    bottom: 15px;
    right: 15px;
  }
`;

const LanguageButton = styled(motion.button)<{ active: boolean; isMainButton?: boolean }>`
  background: ${props => props.active ? 'linear-gradient(135deg, rgba(183, 28, 28, 0.4), rgba(255, 82, 82, 0.4))' : 'transparent'};
  border: none;
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '400'};
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  white-space: nowrap;
  min-width: ${props => props.isMainButton ? '44px' : 'auto'};
  
  &:hover {
    color: #ffffff;
    background: ${props => !props.active && 'linear-gradient(135deg, rgba(183, 28, 28, 0.15), rgba(255, 82, 82, 0.15))'};
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

const ArrowIcon = styled(motion.span)`
  font-size: 10px;
  margin-left: 3px;
  display: inline-block;
`;

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'de', label: 'DE' }
  ];
  
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];
  
  const handleLanguageChange = (code: Language) => {
    if (code !== language) {
      setLanguage(code);
    }
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    hidden: { 
      opacity: 0,
      x: -10,
      scale: 0.9,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <SwitcherContainer 
      ref={containerRef}
      animate={{ 
        width: isOpen ? 'auto' : 'auto',
        transition: { duration: 0.4 }
      }}
    >
      {!isOpen ? (
        <LanguageButton 
          active={true}
          isMainButton={true}
          onClick={toggleDropdown}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          {currentLanguage.label}
          <ArrowIcon
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.4 }}
          >
            ▼
          </ArrowIcon>
        </LanguageButton>
      ) : (
        <AnimatePresence>
          {languages.map((lang, index) => (
            <LanguageButton
              key={lang.code}
              active={language === lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              custom={index}
              transition={{
                duration: 0.3,
                delay: index * 0.08
              }}
            >
              {lang.label}
            </LanguageButton>
          ))}
        </AnimatePresence>
      )}
    </SwitcherContainer>
  );
};

export default LanguageSwitcher; 