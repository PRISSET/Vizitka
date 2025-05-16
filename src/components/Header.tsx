import styled from 'styled-components';
import { useState, useEffect } from 'react';

const HeaderContainer = styled.header`
  padding: 1.5rem 0;
  position: sticky;
  top: 0;
  background-color: rgba(10, 17, 40, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 100;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Logo = styled.a`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-color);
  display: flex;
  align-items: center;
  
  span {
    color: var(--primary-color);
    margin-right: 5px;
  }
  
  &:hover {
    color: var(--text-color);
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a<{ $isActive?: boolean }>`
  color: ${props => props.$isActive ? 'var(--primary-color)' : 'var(--text-color)'};
  font-weight: ${props => props.$isActive ? '600' : '500'};
  position: relative;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
    box-shadow: 0 0 8px rgba(52, 152, 219, 0.8);
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const MobileButton = styled.button`
  display: none;
  font-size: 1.5rem;
  color: var(--text-color);
  
  @media (max-width: 768px) {
    display: block;
  }
`;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Определение активной секции при скролле
      const sections = ['hero', 'about'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeaderContainer style={{ 
      padding: scrolled ? '1rem 0' : '1.5rem 0',
      backgroundColor: scrolled ? 'rgba(10, 17, 40, 0.9)' : 'rgba(10, 17, 40, 0.7)'
    }}>
      <NavContainer>
        <Logo href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
          <span>{'</'}</span>Nazar
        </Logo>
        <Nav>
          <NavLink 
            href="#about" 
            $isActive={activeSection === 'about'} 
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
          >
            Обо мне
          </NavLink>
        </Nav>
        <MobileButton>☰</MobileButton>
      </NavContainer>
    </HeaderContainer>
  );
}

export default Header; 