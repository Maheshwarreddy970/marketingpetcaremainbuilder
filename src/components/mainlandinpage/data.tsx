// --- 1. NAVBAR CONTENT ---
export const NAVBAR_CONTENT = {
  brand: {
    prefix: "NexPet",
    suffix: "Care",
    href: "/",
  },
  logo: {
    src: "/mainlogo.png",
    alt: "NexPet Care Logo",
  },
  navLinks: [
    { label: "Home", href: "/", active: true },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Portfolio", href: "/portfolio" },
  ],
};


export const CATCH_CONTENT = {
  id: "the-catch",
  title: "Why is hosting $0/month?",
  intro:
    "Wix and Squarespace charge $29–$50 a month because you're renting heavy drag-and-drop builder software. We build it differently.",
  points: [
    {
      title: "Fully custom before launch",
      body: "We build all 4 pages around your business: your photos, services, branding, and the booking system you already use.",
    },
    {
      title: "Simple, safe edits after launch",
      body: "Use your private dashboard to change prices, hours, text, and photos in seconds, without ever breaking your mobile layout.",
    },
  ],
  catchPoint: {
    title: "The one catch",
    body: "It's not a drag-and-drop builder, so you can't add new layout blocks or extra pages yourself. That keeps your public site lightweight and cached, which is why hosting costs us pennies and we include it at $0/month. You can export your frontend site files anytime.",
  },
  footer:
    "Need a 5th page or a major redesign later? You pay a small one-time fee only if you ask for it. Never a forced monthly bill.",
};

export const HERO_CONTENT = {
  heading: ["Pay once.", "Own your website."],
  description:
    "We design and launch a custom site for groomers, daycares, and clinics, then connect it to the booking software you already use. No monthly hosting bill.",
  secondaryCta: { label: "See pricing", href: "/pricing" },

  // One short trust line under the main CTA. The button scrolls to CATCH_CONTENT.
  trustStrip: {
    items: ["$0 upfront until you love it","$799 one-time", "$0/mo hosting", "You own the code"],
  },

  comparison: {
    ariaLabel: "Three-year cost comparison",
    rows: [
      { label: "Wix Core with online booking, 3 years", amount: "$1,044", highlight: false },
      { label: "NexPet build, paid once", amount: "$799", highlight: true },
    ],
    note: "Wix at $29 a month, billed yearly, over 36 months. By month 28 the Wix plan has cost more than $799. Domain renewals are not included on either side.",
  },
};


// Replace the old TESTIMONIALS_CONTENT block in ./data with this one.

// Replace the old TESTIMONIALS_CONTENT block in ./data with this one.

export type Testimonial = {
  business: string // used for the logo alt text and the React key
  reviewer: string // bold line in the attribution plate
  role: string // small line under the reviewer
  logo: string
  quote: string
  liveSince: string
  website: { label: string; href: string }
  instagram: { label: string; href: string }
  highlight?: { value: string; label: string }
  proof?: { src: string } // review screenshot in /public, opens in a lightbox
}

export const TESTIMONIALS_CONTENT: {
  id: string
  title: string
  intro: string
  items: Testimonial[]
} = {
  id: "testimonials",
  title: "Don’t take our word for it",
  intro:
    "Two pet businesses, two custom sites. Open their live websites and see the work for yourself.",
  items: [
    {
      business: "Pet Town Grooming Inc",
      reviewer: "Pet Town Grooming Inc",
      role: "Dog grooming",
      logo: "/client2.webp",
      liveSince: "Aug 2026",
      quote:
        "Maheshwar and his team at Nexpetcare were wonderful. Not only did they accommodate my requests and even went ahead to give me various demo websites, adjusting to our business needs and completely understanding us. One can tell they had our best interest in mind and it felt more personal than the standard ready to go websites platform. I highly recommend Nexpetcare 100%",
      website: {
        label: "pettowngrooming.com",
        href: "https://pettowngrooming.com/",
      },
      instagram: {
        label: "@pettowngroominginc",
        href: "https://www.instagram.com/pettowngroominginc",
      },
      proof: { src: "/reviewonescreenshort.avif" },
    },
    {
      business: "The Dog Teeth Cleaning Boutique",
      reviewer: "Helen Everett",
      role: "The Dog Teeth Cleaning Boutique",
      logo: "/client1.avif",
      liveSince: "Aug 2026",
      quote:
        "Wow!!! Thank you so so so much! You brought a happy tear to my eyes :) I can’t thank you enough for putting up with all my changes. We love the website and I’m already at a 20% increase of bookings because of the beautiful website and online bookings 💜🌈💜🌈💜🐕🌈🐾 Also, it’s so super nice and awesome of you for pushing the settings page. WOW wow wow, that’s so amazing and I can’t thank you enough.",
      website: {
        label: "doggieteethcleaning.ca",
        href: "https://doggieteethcleaning.ca/",
      },
      instagram: {
        label: "@thedogteethcleaningboutique",
        href: "https://www.instagram.com/thedogteethcleaningboutique/",
      },
      highlight: {
        value: "20%",
        label: "increase in bookings, reported by the owner",
      },
      proof: { src: "/reviewtwoscreenshort.avif" },
    },
  ],
}

// --- 3. INTEGRATIONS CONTENT ---
export const INTEGRATE_CONTENT = {
  heading: "Connects directly to the booking tools you already use",
  logos: [
    { src: "/logos/logo-colored.567e1a83.png", alt: "Square" },
    { src: "/logos/Yyeq5JBdPOlCbi3940tI1rJVUxg.avif", alt: "Vagaro" },
    { src: "/logos/images (1).png", alt: "DaySmart" },
    { src: "/logos/images (2).png", alt: "Gingr" },
    { src: "/logos/images (3).png", alt: "MoeGo" },
    { src: "/logos/images (4).png", alt: "Groomer.io" },
    { src: "/logos/65f8c006bb3910ba9ca00e98_Teddy Logo Secondary (1)-p-1600.png", alt: "Teddy" },
    { src: "/logos/banner_logo.png", alt: "Groomore" },
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
    us: "$0 / month",
    wix: "$29 – $50 / month",
    wp: "$25 – $100+ / month",
  },
  {
    feature: "Who Builds It?",
    us: "100% Done-For-You",
    wix: "You do the hard work",
    wp: "Expensive local agencies",
  },
  {
    feature: "Mobile Speed & SEO",
    us: "Fast, cached React pages",
    wix: "Often heavy on mobile",
    wp: "Slows down with plugins",
  },
  {
    feature: "Future Edits",
    us: "Simple click-and-type dashboard",
    wix: "Confusing, cluttered menus",
    wp: "Often needs a developer",
  },
  {
    feature: "Maintenance & Security",
    us: "Cached static frontend (no risky plugins)",
    wix: "Managed by platform",
    wp: "Needs constant plugin updates",
  },
];

// --- 5. FEATURES CONTENT ---
export const AVAILABILITY_CONTENT = {
  badge: "Built for Growth",
  title: "Everything your pet business needs to thrive online",
  description:
    "We don't just build a website; we build a clean, mobile-first storefront designed to turn local Google searches into booked appointments.",
  stats: {
    number: "$0",
    suffix: "",
    label: "Monthly Hosting Fees",
  },
  features: [
    "Mobile-First Design for Pet Parents on the go",
    "Direct link or embed to your booking page",
    "Local SEO structure built-in from day one",
  ],
};

// --- 9. FAQ CONTENT ---
export const FAQ_CONTENT = {
  heading: "Frequently Asked Questions",
  logoAlt: "NexPet Care",
  logoSrc: "/sqrlogo.png",
  expandIcon: "+",
  items: [
    {
      id: "faq-1",
      question: "Do I really pay $0 in monthly hosting fees?",
      answer:
        "Yes. Your live public site runs as lightweight, globally cached static pages rather than a heavy monthly builder, so it costs us pennies to keep online. Once you pay the $799 one-time build fee, we never send you a monthly hosting bill. You only pay your standard annual domain renewal (~$12–$20/year) directly to your registrar like GoDaddy or Namecheap.",
    },
    {
      id: "faq-2",
      question: "Will this work with my booking software?",
      answer:
        "Yes. Every 'Book Now' button on your site connects directly to your existing online booking link or embed widget from Square, MoeGo, Vagaro, DaySmart, Gingr, Groomer.io, or any other booking platform—so you never have to switch software or migrate client records.",
    },
    {
      id: "faq-3",
      question: "What if I already own a domain name?",
      answer:
        "Perfect. Once your new website is approved and ready to launch, we point your existing domain (e.g., www.yourgroomingsalon.com) to your new site. You keep full ownership of your domain, and your business emails stay completely untouched.",
    },
    {
      id: "faq-4",
      question: "Do I have to write the text and provide photos?",
      answer:
        "No. We write clean, tailored copy around your services and location. If you have your own salon and pet photos, we love using them—and if you're short on photos, we fill the gaps with clean pet photography until you want to swap in your own.",
    },
    {
      id: "faq-5",
      question: "How long does it take to build my website?",
      answer:
        "Our standard turnaround time is 5 to 7 business days once we have your branding, service list, and booking link. We handle all the heavy lifting so you can stay focused on the pets.",
    },
    {
      id: "faq-6",
      question: "Will my website rank locally on Google?",
      answer:
        "We build every site with clean local SEO fundamentals from day one—fast mobile load times, structured city and service headings, metadata, and clean URLs—so pet parents searching locally can find you easily.",
    },
    {
      id: "faq-7",
      question: "Can I make changes to the site myself?",
      answer:
        "Yes. You get a simple, private editing dashboard where you can update prices, hours, text, photos, FAQs, and service order anytime—then hit Publish to push changes live in seconds without ever breaking the layout.",
    },
    {
      id: "faq-8",
      question: "Do I own the website after it is built?",
      answer:
        "Yes. You own your domain, your content, your photos, and your finished frontend website code. If you ever want to move off our $0/month hosting, you can request a full export of your site files anytime and host them on your own account (such as Cloudflare Pages, Vercel, or Netlify). Note: the private editing dashboard runs on NexPet Care's platform, so self-hosted exports are edited directly in code.",
    },
    {
      id: "faq-9",
      question: "What happens after the 30 days of launch support?",
      answer:
        "Your 30 days of launch support cover hands-on tweaks, photo swaps, and fine-tuning right after go-live. After that, your website stays online at $0/month, your editing dashboard keeps working, and if anything ever breaks on our infrastructure, we fix it free. You only pay again if you ask us to design a new page or custom feature later.",
    },
    {
      id: "faq-10",
      question: "How does payment work?",
      answer:
       "You pay $0 upfront. We build your full 4-page preview and let you test-drive your editing dashboard first. You only pay the $799 one-time fee via Stripe (credit/debit card) once you love it and give the green light to connect your live domain."
    },
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
  footerNote:"$0 due upfront. We build and customize your full preview first—you only pay via Stripe once you've tested your site and dashboard and approved launch. Includes 30 days of support.",
  features: [
    "100% Done-For-You Custom Build",
    "$0 Monthly Hosting Fees",
    "Private Click-and-Type Editing Dashboard",
    "Connected to your existing booking software",
    "Pointed to your existing domain name",
    "Fast, secure React infrastructure",
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
      src: '/mainlogo.png',
      alt: 'NexPet Care logo',
    },
  },
  graphics: {
    // left: {
    //   src: '/petgroomer.svg',
    //   alt: 'pet groomer graphic',
    // },
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
        name: 'YouTube',
        href: 'https://www.youtube.com/@Nexpetcare',
        svgPath: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
      }
    ]
  }
};


export const HOW_IT_WORKS_CONTENT = {
  heading: "How It Works",
  description: "Get your pet grooming business online and thriving in just a few simple steps.",
  steps: [
    {
      title: "Preview & Quick Call",
      description:
        "Review your custom salon preview and hop on a quick call to walk through your services, photos, and any changes you want.",
      colorTheme: "orange",
      colors: {
        bg: "bg-orange-50 dark:bg-orange-500/10",
        text: "text-orange-500 dark:text-orange-400",
        border: "border-orange-100 dark:border-orange-500/20",
      },
    },
    {
      title: "Custom Build",
      description:
        "We tailor all 4 pages with your real photos, pricing, branding, and existing booking link within 5–7 business days.",
      colorTheme: "blue",
      colors: {
        bg: "bg-blue-50 dark:bg-blue-500/10",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-100 dark:border-blue-500/20",
      },
    },
    {
      title: "Review & Refine",
      description:
        "Click through your staging site on your phone and computer. We dial in your edits until everything looks right.",
      colorTheme: "purple",
      colors: {
        bg: "bg-purple-50 dark:bg-purple-500/10",
        text: "text-purple-600 dark:text-purple-400",
        border: "border-purple-100 dark:border-purple-500/20",
      },
    },
    {
      title: "Launch & Own It",
      description:
        "We connect your domain and existing booking system, hand over your private editing dashboard, and push your site live.",
      colorTheme: "orange",
      colors: {
        bg: "bg-orange-50 dark:bg-orange-500/10",
        text: "text-orange-500 dark:text-orange-400",
        border: "border-orange-100 dark:border-orange-500/20",
      },
    },
  ],
  positions: [
    { className: "md:absolute md:top-0 md:left-[15%]", rotate: "rotate-6" },
    { className: "md:absolute md:top-[120px] md:right-[15%]", rotate: "-rotate-6" },
    { className: "md:absolute md:top-[450px] md:left-[15%]", rotate: "rotate-6" },
    { className: "md:absolute md:top-[570px] md:right-[10%]", rotate: "-rotate-6" },
  ],
};