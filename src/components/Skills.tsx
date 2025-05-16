import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SkillsSection = styled.section`
  padding: 6rem 0;
  background-color: #f8f9fa;
  
  @media (max-width: 768px) {
    padding: 4rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 3rem 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  
  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  
  span {
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;

const SkillCard = styled(motion.div)`
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: var(--card-shadow);
  transition: transform var(--transition-speed);
  
  h3 {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    
    svg {
      margin-right: 0.5rem;
    }
  }
  
  p {
    color: var(--light-text-color);
    line-height: 1.6;
  }
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    
    h3 {
      font-size: 1.2rem;
    }
    
    p {
      font-size: 0.95rem;
    }
  }
  
  @media (max-width: 480px) {
    padding: 1.2rem;
    
    &:hover {
      transform: none; /* Отключаем эффект наведения на мобильных */
    }
  }
`;

const SkillProgress = styled.div`
  margin-top: 1.5rem;
  
  .skill-name {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .progress-bar {
    height: 8px;
    background-color: #e9ecef;
    border-radius: 10px;
    margin-bottom: 1rem;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background-color: var(--primary-color);
    border-radius: 10px;
    transition: width 1s ease-in-out;
  }
  
  @media (max-width: 480px) {
    margin-top: 1.2rem;
    
    .progress-bar {
      height: 6px;
      margin-bottom: 0.8rem;
    }
    
    .skill-name {
      font-size: 0.9rem;
    }
  }
`;

interface SkillProps {
  name: string;
  level: number;
}

const Skill: React.FC<SkillProps> = ({ name, level }) => {
  return (
    <div>
      <div className="skill-name">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="progress-bar">
        <motion.div 
          className="progress-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </div>
  );
};

function Skills() {
  return (
    <SkillsSection id="skills">
      <Container>
        <SectionTitle>Мои <span>Навыки</span></SectionTitle>
        <SkillsGrid>
          <SkillCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3>Frontend разработка</h3>
            <p>Создание современных и отзывчивых пользовательских интерфейсов с использованием современных инструментов.</p>
            <SkillProgress>
              <Skill name="HTML/CSS" level={95} />
              <Skill name="JavaScript" level={90} />
              <Skill name="React" level={88} />
            </SkillProgress>
          </SkillCard>
          
          <SkillCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3>Backend разработка</h3>
            <p>Разработка надежных серверных решений с использованием современных технологий.</p>
            <SkillProgress>
              <Skill name="Node.js" level={85} />
              <Skill name="Express" level={82} />
              <Skill name="MongoDB" level={78} />
            </SkillProgress>
          </SkillCard>
          
          <SkillCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>UI/UX Дизайн</h3>
            <p>Создание интуитивных пользовательских интерфейсов и приятного пользовательского опыта.</p>
            <SkillProgress>
              <Skill name="Figma" level={80} />
              <Skill name="Adobe XD" level={75} />
              <Skill name="UI Principles" level={85} />
            </SkillProgress>
          </SkillCard>
          
          <SkillCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3>Другие навыки</h3>
            <p>Дополнительные технологии и инструменты, которыми я владею.</p>
            <SkillProgress>
              <Skill name="Git/GitHub" level={90} />
              <Skill name="TypeScript" level={85} />
              <Skill name="CI/CD" level={70} />
            </SkillProgress>
          </SkillCard>
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
}

export default Skills; 