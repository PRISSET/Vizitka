import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  height: 90vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 2rem;
  
  span {
    color: var(--primary-color);
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  max-width: 600px;
`;

const Button = styled(motion.button)`
  background-color: var(--primary-color);
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  margin-right: 1rem;
`;

function Home() {
  return (
    <>
      <HeroSection>
        <Container>
          <Title>
            Hello, I'm <span>YourName</span>
          </Title>
          <Subtitle>
            A passionate web developer specialized in creating modern, 
            responsive and user-friendly applications.
          </Subtitle>
          <div>
            <Button>View Portfolio</Button>
            <Link to="/contact">Contact Me</Link>
          </div>
        </Container>
      </HeroSection>
    </>
  );
}

export default Home; 