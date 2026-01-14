import type { Site, Metadata, Socials, CodeStack, CMSStack, DesignStack, GeneralStack } from "@types";

export const SITE: Site = {
  NAME: "CassiGS / Frontend Developer",
  EMAIL: "ccgall@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "CassiGS - Frontend Developer",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  { 
    NAME: "github",
    HREF: "https://github.com/CassiGS"
  },
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/cassigs/",
  }
];

export const CODE_STACK: CodeStack = [
  'ReactJS', 'HTML', "CSS/SASS/Tailwind"
]


export const CMS_STACK: CMSStack = [
  'Wordpress', 'Contentful', "Drupal"
]

export const DESIGN_STACK: DesignStack = [
  "UX/UI Principles", "Figma", "Responsive Design"
]

export const GENERAL_STACK: GeneralStack = [
  "Cross Team Collaboration", "Web Performance & SEO", "Agile Workflow"
]