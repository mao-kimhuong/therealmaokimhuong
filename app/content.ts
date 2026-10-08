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

export const CONTACT_WORDS = [
  "CONTACT", "ទំនាក់ទំនង", "CONTACTO", "CONTACTEZ", "KONTAKT",
  "CONTATTO", "LIÊN HỆ", "ติดต่อ", "連絡", "연락", "联系",
];
