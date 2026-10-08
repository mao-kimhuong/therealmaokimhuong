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
      "Full-stack web apps on PHP, Laravel and ThinkPHP5 with React on the front — from database schema to the screen your users actually touch.",
    image: "/images/IMG_3896.JPG",
  },
  {
    title: "APIs & integrations",
    description:
      "RESTful APIs with JWT auth, rate limiting and clean docs. Third-party providers wired in end-to-end, with alerts when something goes wrong.",
    image: "/images/dashboard.png",
  },
  {
    title: "POS & business systems",
    description:
      "Point of sale, inventory, warehouse and CRM systems built for multi-shop, multi-warehouse operations, with role-based access throughout.",
    image: "/images/pos.jpg",
  },
  {
    title: "Mobile app backends",
    description:
      "The platform behind iOS and Android apps — production modules, ETL pipelines for reporting, and admin portals your team can run without a developer.",
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
      "15+ production modules across 8 epics for a live fintech app — device protection, trade-in, installment, Visa card, POS and search — shipped to iOS and Android users.",
    tags: "ThinkPHP5 · FastAdmin · MySQL · Redis · Docker",
    image: "/images/menu.png",
  },
  {
    title: "POS & Inventory System",
    description:
      "Point of sale, inventory, warehouse, CRM and vendor management built from scratch, supporting multi-shop and multi-warehouse operations.",
    tags: "PHP · MySQL · jQuery",
    image: "/images/pos.jpg",
  },
  {
    title: "Masterchat",
    description:
      "A real-time messaging platform for BluePrint Technology with live message delivery, a responsive UI and hardened API access.",
    tags: "Laravel · Firebase · JavaScript",
    image: "/images/dashboard.png",
  },
  {
    title: "Gift Card Integration",
    description:
      "End-to-end integration of a third-party gift card provider — list, checkout and order history — plus Telegram alerts for real-time stock outages.",
    tags: "ThinkPHP5 · REST API · Telegram Bot",
    image: "/images/IMG_3899.JPG",
  },
];

export const CONTACT_WORDS = [
  "CONTACT", "ទំនាក់ទំនង", "CONTACTO", "CONTACTEZ", "KONTAKT",
  "CONTATTO", "LIÊN HỆ", "ติดต่อ", "連絡", "연락", "联系",
];
