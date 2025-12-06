import { Project, Experience, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const SKILLS = [
  { name: "React", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "GSAP", level: 80 },
  { name: "Tailwind CSS", level: 95 },
  { name: "Python", level: 75 },
  { name: "UI/UX Design", level: 85 },
  { name: "VS Code", level: 90 },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "EasyWay Technology",
    category: "Web Development",
    description: "Corporate website for EasyWay Technology offering digital solutions and tech services.",
    image: "https://picsum.photos/800/600?random=1",
    tags: ["React", "GSAP", "Tailwind CSS"],
    link: "https://easywaytechnology.netlify.app/",
    previewMode: 'iframe'
  },
  {
    id: 2,
    title: "EasyWay Groups",
    category: "Web Development",
    description: "Professional website for EasyWay Groups showcasing their business portfolio and services.",
    image: "https://picsum.photos/800/600?random=2",
    tags: ["React", "TypeScript", "SEO"],
    link: "https://easywaygroups.netlify.app/",
    previewMode: 'iframe'
  },
  {
    id: 3,
    title: "Cascade AI Agent",
    category: "AI/ML",
    description: "An intelligent AI coding agent built to assist developers with code generation and problem-solving.",
    image: `${import.meta.env.BASE_URL}images/cascade-preview.png`,
    tags: ["AI", "React", "TypeScript"],
    link: "https://cascade-ai-agent.netlify.app/",
    previewMode: 'image'
  },
  {
    id: 4,
    title: "Unicode Aarthasarokar",
    category: "Web Development",
    description: "A comprehensive web platform for Unicode Aarthasarokar with modern design and functionality.",
    image: "https://picsum.photos/800/600?random=4",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    link: "https://unicode-aarthasrkoar.netlify.app/",
    previewMode: 'iframe'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 0,
    year: "2026",
    title: "Pursuing BIT (Bachelor of Information Technology)",
    organization: "Far Western University",
    description: "Currently pursuing Bachelor's degree in Information Technology."
  },
  {
    id: 1,
    year: "2025",
    title: "Senior Web Developer",
    organization: "EasyWay Group",
    description: "Working as a Senior Web Developer, building modern web applications and leading development projects."
  },
  {
    id: 2,
    year: "2025",
    title: "Combined Project with SAAS Technology Nepal",
    organization: "SAAS Technology Nepal",
    description: "Collaborated on a combined project delivering innovative software solutions."
  },
  {
    id: 3,
    year: "2025",
    title: "LLM and AI Training",
    organization: "Life Tech Private Limited, Kathmandu",
    description: "Completed professional training in Large Language Models (LLM) and Artificial Intelligence."
  },
  {
    id: 4,
    year: "2025",
    title: "+2 Graduate - Computer Science",
    organization: "Higher Secondary Education",
    description: "Passed +2 level education with Computer Science as the major subject."
  },
  {
    id: 5,
    year: "2023",
    title: "Tech Fest 2.0 - 2nd Prize Winner",
    organization: "Tech Fest 2.0",
    description: "Won second prize in Tech Fest 2.0 with our team in the Robo Soccer competition."
  }
];

export const CONTACT_INFO = {
  phone1: "9700804395",
  phone2: "9868760150",
  email: "krishna21karki@gmail.com",
  location: "Krishnapur-02, Kanchanpur, Nepal"
};
