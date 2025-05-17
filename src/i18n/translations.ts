export type Language = 'en' | 'ru' | 'de';

export interface Translation {
  profileTitle: string;
  bio1: string;
  bio2: string;
  yearsExperience: string;
  projects: string;
  technologies: string;
  telegramButton: string;
  instagramButton: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    profileTitle: 'Front-end Developer',
    bio1: 'My name is PRISSET, I am 18 years old. I have been doing web development for more than three years, mainly on the frontend. During this time, I have created and participated in the development of more than 20 projects. I am proficient in HTML, CSS, JavaScript, TypeScript, and React.',
    bio2: 'I am constantly developing and striving to create clean, scalable, and efficient code. My approach combines creativity and attention to detail, which allows me to create high-quality web applications.',
    yearsExperience: 'Years of experience',
    projects: 'Projects',
    technologies: 'Technologies',
    telegramButton: 'Message on Telegram',
    instagramButton: 'Message on Instagram'
  },
  ru: {
    profileTitle: 'Front-end Разработчик',
    bio1: 'Меня зовут PRISSET, мне 18 лет. Уже более трёх лет я занимаюсь веб-разработкой, в основном на фронтенде. За это время создал и участвовал в разработке более 20 проектов. Владею HTML, CSS, JavaScript, TypeScript и React.',
    bio2: 'Постоянно развиваюсь и стремлюсь к созданию чистого, масштабируемого и эффективного кода. Мой подход сочетает творчество и внимание к деталям, что позволяет создавать качественные веб-приложения.',
    yearsExperience: 'Года опыта',
    projects: 'Проектов',
    technologies: 'Технологий',
    telegramButton: 'Написать в Телеграм',
    instagramButton: 'Написать в Instagram'
  },
  de: {
    profileTitle: 'Front-end Entwickler',
    bio1: 'Mein Name ist PRISSET, ich bin 18 Jahre alt. Seit mehr als drei Jahren beschäftige ich mich mit Webentwicklung, hauptsächlich im Frontend-Bereich. In dieser Zeit habe ich mehr als 20 Projekte erstellt und an deren Entwicklung teilgenommen. Ich beherrsche HTML, CSS, JavaScript, TypeScript und React.',
    bio2: 'Ich entwickle mich ständig weiter und strebe danach, sauberen, skalierbaren und effizienten Code zu erstellen. Mein Ansatz verbindet Kreativität mit Liebe zum Detail, was es mir ermöglicht, hochwertige Webanwendungen zu erstellen.',
    yearsExperience: 'Jahre Erfahrung',
    projects: 'Projekte',
    technologies: 'Technologien',
    telegramButton: 'Nachricht auf Telegram',
    instagramButton: 'Nachricht auf Instagram'
  }
}; 