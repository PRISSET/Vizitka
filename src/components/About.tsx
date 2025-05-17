import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  z-index: 2;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-color);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  
  span {
    color: var(--primary-color);
  }
`;

const GlassWrapper = styled(motion.div)`
  background: rgba(23, 32, 56, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  padding: 2.5rem;
  margin-bottom: 2rem;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutImage = styled(motion.div)`
  position: relative;
  height: 350px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  background: linear-gradient(45deg, rgba(52, 152, 219, 0.2), rgba(52, 152, 219, 0.1));
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    width: 80%;
    height: 80%;
    object-fit: contain;
    z-index: 2;
    border-radius: 50%;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(52, 152, 219, 0.3), rgba(10, 17, 40, 0.2));
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    height: 300px;
    margin-bottom: 2rem;
  }
`;

const AboutText = styled(motion.div)`
  color: var(--light-text-color);
  
  p {
    margin-bottom: 1.2rem;
    line-height: 1.7;
  }
`;

const TechTag = styled.span`
  display: inline-block;
  background: rgba(52, 152, 219, 0.2);
  color: var(--primary-color);
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  margin: 0.3rem;
  font-size: 0.9rem;
  border: 1px solid rgba(52, 152, 219, 0.3);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const TechTagsContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

function About() {
  return (
    <AboutSection id="about">
      <Container>
        <SectionTitle>Обо <span>мне</span></SectionTitle>
        <GlassWrapper
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AboutContent>
            <AboutImage
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src="https://i.imgur.com/BKG3aHJ.png" alt="PRISSET" />
            </AboutImage>
            <AboutText
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p>
                Привет! Меня зовут PRISSET, мне 18 лет. Уже более трёх лет я занимаюсь 
                веб-разработкой, в основном на фронтенде. За это время создал и участвовал 
                в разработке более 20 проектов.
              </p>
              <p>
                Я стремлюсь к созданию чистого, масштабируемого и эффективного кода. 
                Мой подход сочетает творчество и внимание к деталям, что позволяет 
                создавать качественные веб-приложения.
              </p>
              <TechTagsContainer>
                <TechTag>HTML5</TechTag>
                <TechTag>CSS3</TechTag>
                <TechTag>JavaScript</TechTag>
                <TechTag>TypeScript</TechTag>
                <TechTag>React</TechTag>
                <TechTag>Redux</TechTag>
                <TechTag>Git</TechTag>
              </TechTagsContainer>
            </AboutText>
          </AboutContent>
        </GlassWrapper>
      </Container>
    </AboutSection>
  );
}

export default About; 