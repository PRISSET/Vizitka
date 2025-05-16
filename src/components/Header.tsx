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

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 100vh;
  background: var(--background-color);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 2rem;
  transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.5);
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3rem;
`;

const MobileNavLink = styled.a<{ $isActive?: boolean }>`
  color: ${props => props.$isActive ? 'var(--primary-color)' : 'var(--text-color)'};
  font-size: 1.2rem;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.8rem;
  color: var(--text-color);
  background: none;
  border: none;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
    setMobileMenuOpen(false);
  };

  return (
    <>
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
          <MobileButton onClick={() => setMobileMenuOpen(true)}>☰</MobileButton>
        </NavContainer>
      </HeaderContainer>
      
      <Overlay isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(false)} />
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <CloseButton onClick={() => setMobileMenuOpen(false)}>×</CloseButton>
        <MobileNav>
          <MobileNavLink 
            href="#hero" 
            $isActive={activeSection === 'hero'} 
            onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
          >
            Главная
          </MobileNavLink>
          <MobileNavLink 
            href="#about" 
            $isActive={activeSection === 'about'} 
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
          >
            Обо мне
          </MobileNavLink>
        </MobileNav>
      </MobileMenu>
    </>
  );
}

export default Header; 