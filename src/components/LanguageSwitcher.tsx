import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

const SwitcherContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  gap: 10px;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 30px;
  padding: 8px 12px;
  border: 1px solid rgba(78, 108, 189, 0.2);
  box-shadow: 
    0 4px 10px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(52, 152, 219, 0.2);
    
  @media (max-width: 768px) {
    top: auto;
    bottom: 20px;
    right: 20px;
    padding: 6px 10px;
  }
  
  @media (max-width: 480px) {
    bottom: 15px;
    right: 15px;
  }
`;

const LanguageButton = styled(motion.button)<{ active: boolean }>`
  background: ${props => props.active ? 'rgba(52, 152, 219, 0.3)' : 'transparent'};
  border: none;
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '400'};
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: #ffffff;
    background: ${props => !props.active && 'rgba(52, 152, 219, 0.15)'};
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'de', label: 'DE' }
  ];
  
  return (
    <SwitcherContainer>
      {languages.map((lang) => (
        <LanguageButton
          key={lang.code}
          active={language === lang.code}
          onClick={() => setLanguage(lang.code)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {lang.label}
        </LanguageButton>
      ))}
    </SwitcherContainer>
  );
};

export default LanguageSwitcher; 