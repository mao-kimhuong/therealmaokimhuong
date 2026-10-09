// All copy and links for the site live here.

export const SITE = {
  name: "Mao Kim Huong",
  email: "maokimhuong.office@gmail.com",
  phone: "+855 96 37 38 968",
  telegram: "https://t.me/maokimhuong",
  github: "https://github.com/maokimhuong",
  resume: "/resume.pdf",
};

export const LINKS = {
  bookCall: SITE.telegram,
  quote: `mailto:${SITE.email}?subject=${encodeURIComponent("Project enquiry")}`,
};

export const SERVICES = [
  {
    title: "Web applications",
    description:
      "Full-stack web apps on PHP, Laravel and ThinkPHP5, with JavaScript, jQuery and Bootstrap on the front — from database schema to the screen your users actually touch.",
    image: "/images/IMG_3896.JPG",
  },
  {
    title: "APIs & integrations",
    description:
      "RESTful APIs with token-based auth, consumed by iOS and Android apps. Firebase and third-party web APIs wired in end-to-end, plus SMTP email notifications.",
    image: "/images/dashboard.png",
  },
  {
    title: "POS & business systems",
    description:
      "Point of sale, inventory, warehouse and CRM systems built for multi-shop, multi-warehouse operations, with role-based access throughout.",
    image: "/images/pos.jpg",
  },
  {
    title: "Admin portals & DevOps",
    description:
      "Admin portals your team can run without a developer — CRUD with xlsx/csv export, drag-sort, status toggles and date filters — on Dockerised PHP 8, MySQL 8, Redis and Nginx.",
    image: "/images/menu.png",
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string;
  image: string;
  video?: string;
  href?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "iOneCard Platform",
    description:
      "10+ production modules for a live fintech platform — device protection insurance, trade-in, installment, Visa card, gift card, service center, and real-time search with history.",
    tags: "PHP · ThinkPHP5 · FastAdmin · MySQL · Redis · Docker",
    image: "/images/menu.png",
  },
  {
    title: "Masterchat.io",
    description:
      "A real-time chat system for BluePrint Technology with a responsive UI, live messaging and Firebase integration.",
    tags: "Laravel · JavaScript · Firebase",
    image: "/images/dashboard.png",
  },
  {
    title: "ERP System",
    description:
      "Multi-shop point of sale, inventory, warehouse, CRM and vendor management, built during my internship at Inklusivity Technology.",
    tags: "PHP · MySQL · jQuery · Ajax",
    image: "/images/pos.jpg",
  },
];

export const EXPERIENCE = [
  { role: "Backend / Full-Stack Developer", company: "iOne", dates: "2025 – Present" },
  { role: "Web Developer", company: "BluePrint Technology (Masterchat.io)", dates: "2024 – 2025" },
  { role: "Web Developer Intern", company: "Inklusivity Technology", dates: "Aug 2022 – Jan 2023" },
  { role: "Junior Graphic Designer", company: "The Flora", dates: "Oct 2022 – Apr 2023" },
];

// Skill cards, grouped by layer. `wide` cards span two columns on larger screens.
export const SKILL_BLOCKS = [
  {
    title: "Full stack",
    groups: [
      { layer: "Frontend", wide: true, items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "jQuery", "Ajax", "Bootstrap", "Flutter", "Figma", "UX/UI Design"] },
      { layer: "Database & Storage", items: ["MySQL", "SQL Server", "Redis", "Firebase", "xlsx / csv Export"] },
      { layer: "APIs & Backend Logic", wide: true, items: ["PHP", "Laravel", "ThinkPHP5", "FastAdmin", "Node.js", "Python", "FastAPI", "Java Spring Boot", ".NET", "REST", "GraphQL", "gRPC", "WebSockets", "Webhooks", "OpenAPI", "Async Jobs"] },
      { layer: "Auth & Permissions", items: ["OAuth 2.0", "OpenID Connect", "JWT", "API Keys", "Scopes & Roles", "Role-Based Access"] },
      { layer: "Hosting & Deployment", items: ["Docker", "Nginx", "Web Hosting"] },
      { layer: "Cloud & Compute", items: ["Docker Containers", "Firebase"] },
      { layer: "CI/CD & Version Control", items: ["Git / GitHub", "Feature Branching", "API Versioning", "Contract Testing"] },
      { layer: "Security & RLS", items: ["TLS / HTTPS", "Input Validation", "Schema Validation", "Object-Level Authorization", "Row-Level Security"] },
      { layer: "Rate Limiting", items: ["Rate Limiting", "Throttling & Quotas", "Idempotency Keys"] },
      { layer: "Caching & CDN", items: ["HTTP Caching", "Redis Caching", "Conditional Requests"] },
      { layer: "Load Balancing & Scaling", items: ["Nginx", "API Gateway", "Stateless Services"] },
      { layer: "Error Tracking & Logs", items: ["API Observability", "Problem Details Errors", "Email Notifications"] },
      { layer: "Availability & Recovery", items: ["Timeouts", "Retries & Backoff", "Backward Compatibility"] },
    ],
  },
];


export const CONTACT_WORDS = [
  "CONTACT", "ទំនាក់ទំនង", "CONTACTO", "CONTACTEZ", "KONTAKT",
  "CONTATTO", "LIÊN HỆ", "ติดต่อ", "連絡", "연락", "联系",
];
