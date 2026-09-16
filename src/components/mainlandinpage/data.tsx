// --- 1. NAVBAR CONTENT ---
export const NAVBAR_CONTENT = {
  brand: {
    prefix: "NexPet",
    suffix: "Care",
    href: "/",
  },
  logo: {
    src: "/logosvg.svg",
    alt: "NexPet Care Logo",
  },
  navLinks: [
    { label: "Home", href: "/", active: true },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Portfolio", href: "/portfolio" },
  ],
};

// --- 2. HERO CONTENT ---
export const HERO_CONTENT = {
  badgeLink: "/pricing",
  badgeText: "Stop renting your website. Own it forever →",
  heading: ["Premium,", "Done-For-You", "Websites for", "Pet", "Professionals."],
  description: "We build, design, and launch stunning custom websites for groomers, daycares, and clinics. Zero monthly hosting fees. Fully integrated with your booking software to fill your calendar on autopilot.",
  images: {
    logo: { src: "/logosvg.svg", alt: "NexPet Care logo" },
    daycare: { src: "/daycare.svg", alt: "Dog daycare icon" },
    petgroomer: { src: "/petgroomer.svg", alt: "Pet groomer icon" },
    mobileGrooming: { src: "/mobile-grooming.svg", alt: "Mobile grooming icon" },
  },
};

// --- 3. INTEGRATIONS CONTENT ---
export const INTEGRATE_CONTENT = {
  heading: "Seamlessly integrates with the booking tools you already use",
  logos: [
    { src: "/logos/logo-colored.567e1a83.png", alt: "Square" }, 
    { src: "/logos/Yyeq5JBdPOlCbi3940tI1rJVUxg.avif", alt: "Vagaro" }, 
    { src: "/logos/images (1).png", alt: "DaySmart" },
    { src: "/logos/images (2).png", alt: "Gingr" }, 
    { src: "/logos/images (3).png", alt: "MoeGo" }, 
    { src: "/logos/images (4).png", alt: "Groomer.io" }, 
    { src: "/logos/65f8c006bb3910ba9ca00e98_Teddy Logo Secondary (1)-p-1600.png", alt: "Teddy" },
    { src: "/logos/banner_logo.png", alt: "Groo More" },
  ],
};

// --- 4. COMPARISON CONTENT ---
export const SECTION_CONTENT_COMPARISON = {
    badge: "The Smart Choice",
    title: "Why Pet Pros Are Ditching Wix & Squarespace",
    subtitle: "Stop paying endless monthly fees for a clunky DIY template. Let experts build it so you can focus on the pets.",
};

export const TABLE_HEADERS = {
    feature: "Feature",
    recommendedBadge: "Recommended",
    brandName: "NexPet Care",
    wixSquarespace: "Wix / Squarespace",
    wordpress: "WordPress",
};

export const COMPARISON_DATA = [
    {
        feature: "Monthly Hosting Fees",
        us: "$0 / month forever",
        wix: "$30 - $50 / month",
        wp: "$25 - $100+ / month",
    },
    {
        feature: "Who Builds It?",
        us: "100% Done-For-You",
        wix: "You do the hard work",
        wp: "Expensive local agencies",
    },
    {
        feature: "Mobile Speed & SEO",
        us: "Lightning fast (React code)",
        wix: "Often slow and clunky",
        wp: "Bloated with heavy plugins",
    },
    {
        feature: "Future Edits",
        us: "Simple click-and-type dashboard",
        wix: "Confusing, cluttered menus",
        wp: "Requires a developer",
    },
    {
        feature: "Security",
        us: "Bulletproof (No database to hack)",
        wix: "Standard",
        wp: "Highly vulnerable to hackers",
    },
];

// --- 5. FEATURES CONTENT ---
export const AVAILABILITY_CONTENT = {
    badge: "Built for Growth",
    title: "Everything your pet business needs to thrive online",
    description: "We don't just build a website; we build a 24/7 lead-generation machine for your salon. Designed specifically to convert local pet parents into loyal clients.",
    stats: {
        number: "$0",
        suffix: "",
        label: "Monthly Hosting Fees",
    },
    features: [
        "Mobile-First Design for Pet Parents on the go",
        "Direct integration with your booking calendar",
        "Local SEO built-in to rank locally on Google",
    ],
};

// --- 6. DASHBOARD DEMO CONTENT ---
export const SECTION_CONTENT_DASHBOARD = {
  badge: "Dashboard Demo",
  headline: "Make changes in seconds without a developer.",
  description: "Need to update your holiday hours, change a grooming price, or swap a photo of a cute pup? Just log into your private dashboard, click the text, and type. It really is that easy.",
  playbackSpeeds: [0.5, 1, 1.5, 2],
  speedSuffix: "x",
};

// --- 7. TESTIMONIALS CONTENT ---
export const testimonials = [
  {
    text: "I spent weeks fighting with a DIY website builder before giving up. NexPet Care built me a stunning, professional site in days. The best part? No more $40 monthly hosting bills!",
    name: "Sarah Jenkins",
    title: "Owner, Paws & Bubbles Grooming",
    avatar: "/assets/avatar/avatar1.png",
    size: "lg",
    tone: "light",
  },
  {
    text: "The integration with MoeGo was flawless. My clients love how easy it is to book on the new site, and it loads incredibly fast on their phones.",
    name: "David Chen",
    title: "Mobile Groomer, Suds on Wheels",
    avatar: "https://images.unsplash.com/photo-1638347419042-40d24bb64d0d?q=80&w=3130&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    size: "sm",
    tone: "muted",
  },
  {
    text: "Finally, a web developer that actually understands the pet industry. They knew exactly how to highlight my services and integrated my Square calendar perfectly.",
    name: "Amanda Roberts",
    title: "Manager, The Happy Hound Daycare",
    avatar: "", 
    size: "sm",
    tone: "muted",
  },
  {
    text: "The zero monthly fees model is a game changer for a small business like mine. It paid for itself in less than a year, and the editing dashboard is so simple to use when I need to update pricing.",
    name: "Emily Nakamura",
    title: "Founder, Zen Cat Spa",
    avatar: "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    size: "lg",
    tone: "muted",
  },
  {
    text: "I was worried about moving my domain over, but they handled everything for me. 100% stress-free experience from start to finish.",
    name: "James Rodriguez",
    title: "Owner, Top Dog Boarding",
    avatar: "", 
    size: "sm",
    tone: "muted",
  },
];

// --- 8. PRICING CONTENT ---
export const pricingContent = {
  badge: "Pricing",
  title: "One flat fee. Yours forever.",
  description: "No subscriptions, no contracts, no surprise invoices. Pay once, own your premium website outright, and let it pay for itself with just a few new bookings.",
  planName: "Complete Website Build",
  planSubtitle: "Perfect for Groomers, Salons, and Daycares",
  currency: "$",
  price: "799", 
  buttonText: "Claim Your Website Build",
  footerNote: "Includes: Custom Design, Mobile Optimization, Local SEO Setup, and 30 Days of Support",
  features: [
    "100% Done-For-You Custom Build",
    "$0 Monthly Hosting Fees",
    "Private Click-and-Type Editing Dashboard",
    "Connected to your existing booking software",
    "Pointed to your existing domain name",
    "Fast, secure React infrastructure",
  ],
};

// --- 9. FAQ CONTENT (Heavily Expanded for Conversion) ---
export const FAQ_CONTENT = {
  heading: 'Frequently Asked Questions',
  logoAlt: 'NexPet Care',
  logoSrc: '/logosvg.svg',
  expandIcon: '+',
  items: [
    {
      id: 'faq-1',
      question: 'Do I really pay $0 in monthly hosting fees?',
      answer: 'Yes! We use modern serverless hosting technology. Once you pay the one-time flat fee for the website build, the site is yours forever. You will never receive a monthly hosting bill from us. (You only pay your standard annual domain name renewal to your registrar like GoDaddy or Namecheap).',
    },
    {
      id: 'faq-2',
      question: 'Will this work with my booking software?',
      answer: 'Absolutely. We seamlessly integrate with Square, MoeGo, Vagaro, DaySmart, Gingr, and any other booking platform that provides an online booking link or booking widget.',
    },
    {
      id: 'faq-3',
      question: 'What if I already own a domain name?',
      answer: 'Perfect! Once your new website is approved and ready to launch, we will simply point your new site to your existing domain name (e.g., www.yourgroomingsalon.com). You keep your domain and your business emails remain completely untouched.',
    },
    {
      id: 'faq-4',
      question: 'Do I have to write the text and provide photos?',
      answer: 'Nope! We provide professional, industry-specific copywriting that highlights your services perfectly. If you have your own photos, we’d love to use them! If not, we have access to high-quality, authentic pet photography we can use to make your site look stunning.',
    },
    {
      id: 'faq-5',
      question: 'How long does it take to build my website?',
      answer: 'Our standard turnaround time is 5 to 7 business days from the moment we start. We handle all the heavy lifting so you can stay focused on running your business.',
    },
    {
      id: 'faq-6',
      question: 'Will my website rank locally on Google?',
      answer: 'Yes! We build your site with local SEO (Search Engine Optimization) best practices from day one. We structure your headings, locations, and service keywords perfectly so that pet parents in your specific city can find you when they search for groomers or daycares.',
    },
    {
      id: 'faq-7',
      question: 'Can I make changes to the site myself?',
      answer: 'Yes! We provide you with a simple, private editing dashboard. If you need to change a price, update your holiday hours, or swap out a photo, you just log in, click the text, and type. No coding or developers required.',
    },
    {
      id: 'faq-8',
      question: 'Do I own the website after it is built?',
      answer: '100%. Unlike Wix or Squarespace where you lose your entire site if you stop paying their monthly subscription, you own this website outright. You can even download the full source code if you ever want to move it elsewhere.',
    },
  ],
};

// --- 10. CTA CONTENT ---
export const CTA_CONTENT = {
  headingHighlight: "Ready to upgrade ",
  headingRest: "your online presence?",
  description: "Stop losing clients to competitors with better websites. Let us build you a stunning, lightning-fast site that works exactly as hard as you do.",
  buttonText: "Book Your Free Strategy Call",
  images: {
    hero: {
      alt: "Pet groomer washing a dog",
      src: "/images(10).avif", 
      width: 2340,
      height: 1560,
    },
    collab: {
      alt: "Happy dog after grooming",
      src: "/images(11).avif",
      width: 927,
      height: 1648,
    },
    interfaceDetail: {
      alt: "Mobile booking interface on phone",
      src: "/images(12).avif",
      width: 3047,
      height: 1868,
    },
  },
};

// --- 11. FOOTER CONTENT ---
export const FOOTER_CONTENT = {
  brand: {
    name: 'NexPet Care',
    tagline: 'Premium, Done-For-You Websites for Pet Professionals. Stop renting, start owning.',
    logo: {
      src: '/logosvg.svg',
      alt: 'NexPet Care logo',
    },
  },
  graphics: {
    left: {
      src: '/petgroomer.svg',
      alt: 'pet groomer graphic',
    },
    right: {
      src: '/daycare.svg',
      alt: 'daycare graphic',
    },
  },
  navigation: [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ],
bottom: {
    copyright: '© 2026 NexPet Care. All rights reserved.',
    socials: [
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/maheshwarr-reddy-713927258/',
        svgPath: 'M19.5 0.75C20.4946 0.75 21.4484 1.14509 22.1517 1.84835C22.8549 2.55161 23.25 3.50544 23.25 4.5V19.5C23.25 20.4946 22.8549 21.4484 22.1517 22.1517C21.4484 22.8549 20.4946 23.25 19.5 23.25H4.5C3.50544 23.25 2.55161 22.8549 1.84835 22.1517C1.14509 21.4484 0.75 20.4946 0.75 19.5V4.5C0.75 3.50544 1.14509 2.55161 1.84835 1.84835C2.55161 1.14509 3.50544 0.75 4.5 0.75H19.5ZM19.5 3.25H4.5C4.16848 3.25 3.85054 3.3817 3.61612 3.61612C3.3817 3.85054 3.25 4.16848 3.25 4.5V19.5C3.25 19.8315 3.3817 20.1495 3.61612 20.3839C3.85054 20.6183 4.16848 20.75 4.5 20.75H19.5C19.8315 20.75 20.1495 20.6183 20.3839 20.3839C20.6183 20.1495 20.75 19.8315 20.75 19.5V4.5C20.75 4.16848 20.6183 3.85054 20.3839 3.61612C20.1495 3.3817 19.8315 3.25 19.5 3.25ZM7 9.5C7.30617 9.50004 7.60167 9.61244 7.83047 9.81589C8.05926 10.0193 8.20543 10.2997 8.24125 10.6038L8.25 10.75V17C8.24965 17.3186 8.12765 17.625 7.90894 17.8567C7.69023 18.0884 7.39131 18.2278 7.07326 18.2465C6.7552 18.2651 6.44203 18.1617 6.19771 17.9572C5.95339 17.7527 5.79638 17.4626 5.75875 17.1463L5.75 17V10.75C5.75 10.4185 5.8817 10.1005 6.11612 9.86612C6.35054 9.6317 6.66848 9.5 7 9.5ZM10.75 8.25C11.0427 8.24996 11.3262 8.35266 11.551 8.5402C11.7758 8.72775 11.9276 8.98824 11.98 9.27625C12.2318 9.13085 12.4918 9.00021 12.7588 8.885C13.5925 8.52875 14.8413 8.3325 15.9688 8.68625C16.56 8.87375 17.1538 9.22375 17.5938 9.82C17.9875 10.3512 18.2 10.9975 18.2425 11.7238L18.25 12V17C18.2496 17.3186 18.1277 17.625 17.9089 17.8567C17.6902 18.0884 17.3913 18.2278 17.0733 18.2465C16.7552 18.2651 16.442 18.1617 16.1977 17.9572C15.9534 17.7527 15.7964 17.4626 15.7587 17.1463L15.75 17V12C15.75 11.5875 15.65 11.395 15.585 11.3062C15.4916 11.1903 15.3631 11.1079 15.2188 11.0712C14.7837 10.9338 14.1575 11.0063 13.7412 11.1838C13.1162 11.4513 12.5437 11.8713 12.1538 12.26L12 12.425V17C11.9996 17.3186 11.8777 17.625 11.6589 17.8567C11.4402 18.0884 11.1413 18.2278 10.8233 18.2465C10.5052 18.2651 10.192 18.1617 9.94771 17.9572C9.70339 17.7527 9.54638 17.4626 9.50875 17.1463L9.5 17V9.5C9.5 9.16848 9.6317 8.85054 9.86612 8.61612C10.1005 8.3817 10.4185 8.25 10.75 8.25ZM7 5.75C7.33152 5.75 7.64946 5.8817 7.88388 6.11612C8.1183 6.35054 8.25 6.66848 8.25 7C8.25 7.33152 8.1183 7.64946 7.88388 7.88388C7.64946 8.1183 7.33152 8.25 7 8.25C6.66848 8.25 6.35054 8.1183 6.11612 7.88388C5.8817 7.64946 5.75 7.33152 5.75 7C5.75 6.66848 5.8817 6.35054 6.11612 6.11612C6.35054 5.8817 6.66848 5.75 7 5.75Z'
      },
      {
        name: 'Instagram',
        href: 'https://instagram.com/nexpetcare', 
        svgPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'
      },
      {
        name: 'YouTube',
        href: 'https://www.youtube.com/@Nexpetcare',
        svgPath: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
      }
    ]
  }
};