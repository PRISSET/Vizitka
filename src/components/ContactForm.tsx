import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactSection = styled.section`
  padding: 6rem 0;
  background: transparent;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-color);
  
  span {
    color: var(--primary-color);
  }
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const ContactInfo = styled(motion.div)`
  background: rgba(23, 32, 56, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    position: relative;
    color: var(--text-color);
    
    @media (max-width: 480px) {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 3px;
      background-color: var(--primary-color);
      
      @media (max-width: 768px) {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  
  p {
    margin-bottom: 2rem;
    line-height: 1.8;
    color: var(--light-text-color);
    
    @media (max-width: 480px) {
      margin-bottom: 1.5rem;
    }
  }
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.2rem;
  }
  
  .icon {
    width: 50px;
    height: 50px;
    background-color: rgba(52, 152, 219, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    font-size: 1.5rem;
    color: var(--primary-color);
    
    @media (max-width: 480px) {
      width: 40px;
      height: 40px;
      margin-right: 0;
    }
  }
  
  .text {
    h4 {
      font-size: 1.1rem;
      margin-bottom: 0.3rem;
      color: var(--text-color);
      
      @media (max-width: 480px) {
        font-size: 1rem;
        margin-bottom: 0.2rem;
      }
    }
    
    p {
      margin: 0;
      color: var(--light-text-color);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
  
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: var(--primary-color);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
      background-color: var(--primary-color);
      color: #fff;
      transform: translateY(-3px);
    }
    
    &.bounce {
      animation: bounce 1s ease infinite;
      animation-play-state: paused;
    }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-8px);
    }
    60% {
      transform: translateY(-4px);
    }
  }
`;

const FormContainer = styled(motion.div)`
  background: rgba(23, 32, 56, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--card-shadow);
  
  h3 {
    color: var(--text-color);
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-color);
  }
  
  input, textarea {
    width: 100%;
    padding: 0.8rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-color);
    border-radius: 8px;
    font-family: inherit;
    transition: border 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      background: rgba(255, 255, 255, 0.1);
    }
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  
  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const Alert = styled.div<{ $success?: boolean }>`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  background-color: ${props => props.$success ? 'rgba(46, 204, 113, 0.2)' : 'rgba(231, 76, 60, 0.2)'};
  color: ${props => props.$success ? '#2ecc71' : '#e74c3c'};
  border-left: 4px solid ${props => props.$success ? '#2ecc71' : '#e74c3c'};
`;

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{ message: string, success: boolean } | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlert(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAlert({
        message: 'Ваше сообщение успешно отправлено! Я свяжусь с Вами в ближайшее время.',
        success: true
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setAlert({
        message: 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз позже.',
        success: false
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <ContactSection id="contact">
      <Container>
        <SectionTitle>Связаться <span>со мной</span></SectionTitle>
        <ContactContent>
          <ContactInfo
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Давайте обсудим ваш проект</h3>
            <p>
              Я всегда открыт для новых проектов, творческих идей или возможности стать частью вашей команды.
              Свяжитесь со мной любым удобным для вас способом!
            </p>
            
            <ContactItem>
              <div className="icon">📧</div>
              <div className="text">
                <h4>Email</h4>
                <p>your.email@example.com</p>
              </div>
            </ContactItem>
            
            <ContactItem>
              <div className="icon">📱</div>
              <div className="text">
                <h4>Телефон</h4>
                <p>+7 (999) 123-45-67</p>
              </div>
            </ContactItem>
            
            <ContactItem>
              <div className="icon">📍</div>
              <div className="text">
                <h4>Локация</h4>
                <p>Москва, Россия</p>
              </div>
            </ContactItem>
            
            <SocialLinks>
              <motion.a 
                href="#" 
                aria-label="GitHub"
                className="bounce"
                animate={{ y: [0, -8, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 1.5, 
                  repeatDelay: 3.5 
                }}
              >
                GH
              </motion.a>
              <motion.a 
                href="#" 
                aria-label="LinkedIn"
                className="bounce"
                animate={{ y: [0, -8, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 1.5, 
                  repeatDelay: 3.5 
                }}
              >
                LI
              </motion.a>
              <motion.a 
                href="#" 
                aria-label="Telegram"
                className="bounce"
                animate={{ y: [0, -8, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 1.5, 
                  repeatDelay: 3.5 
                }}
              >
                TG
              </motion.a>
            </SocialLinks>
          </ContactInfo>
          
          <FormContainer
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Отправить сообщение</h3>
            {alert && (
              <Alert $success={alert.success}>
                {alert.message}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="name">Имя</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ваше имя"
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="your@email.com"
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="subject">Тема</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                  placeholder="Тема сообщения"
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="message">Сообщение</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ваше сообщение..."
                />
              </FormGroup>
              
              <SubmitButton 
                type="submit" 
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
              </SubmitButton>
            </Form>
          </FormContainer>
        </ContactContent>
      </Container>
    </ContactSection>
  );
}

export default ContactForm; 