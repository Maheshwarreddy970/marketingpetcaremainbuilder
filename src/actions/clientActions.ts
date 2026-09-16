"use server";

import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const CLOUD_URL = "https://res.cloudinary.com/doscyny4j/image/upload";

const defaultWebsiteOneData = {
  theme: { primaryColor: "#a35c38" },
  navbar: {
    section: { bg: "#ffffff", className: "" },
    logo: { src: `${CLOUD_URL}/logomain_zyihkn.avif`, alt: "Petocare Logo", className: "" },
    styling: { linkColor: "#625b5b", linkHoverColor: "#1e0c05" },
    cta: { label: "Schedule a visit", href: "#contact", bg: "#a35c38", text: "#ffffff", className: "" },
    links: [
      { label: "Home", href: "#home", icon: "Home", className: "" },
      { label: "Gallery", href: "#gallery", icon: "Calendar", className: "" },
      { label: "Services", href: "#services", icon: "Briefcase", className: "" },
      { label: "Process", href: "#process", icon: "Dog", className: "" },
      { label: "Reviews", href: "#reviews", icon: "Reviews", className: "" },
      { label: "FAQ", href: "#faq", icon: "MessageSquare", className: "" }
    ]
  },
  hero: {
    section: { bg: "#fffaf8", className: "" },
    heading: { text: "We care for your pet like our baby", color: "#1e0c05", className: "" },
    description: { text: "Assure clients they're completely safe with a trusted, results-driven experience.", color: "#1e0c05", className: "" },
    image: { src: `${CLOUD_URL}/homeimage_qhup2j.avif`, className: "" },
    cta: { label: "Book A Schedule", href: "#contact", bg: "#a35c38", text: "#ffffff", className: "" },
    socialProof: { stars: 5, starColor: "#8c863a", text: "Over 400 Happy Pets Are Enjoyed", textColor: "#1e0c05", className: "" }
  },
  statsBanner: {
    section: { bg: "#1e0c05", className: "" },
    heading: { text: "Trusted by pet owners across the city for grooming & personal care.", color: "#fdfdfd", className: "" },
    rating: { score: "4.96", max: "/5", scoreColor: "#fdfdfd", stars: 5, starColor: "#8c863a", label: "5-Star Reviews: 500+", labelColor: "#fffaf8", className: "" },
    experience: { title: "8+ Years of Experience", titleColor: "#fdfdfd", subtitle: "Started In 2018", subColor: "#fffaf8", iconColor: "#8c863a", className: "" }
  },
  imageSlider: {
    section: { bg: "#ffffff", className: "" },
    heading: { text: "Happy Pet Smiles", color: "#1e0c05", className: "" },
    description: { text: "Check out a many of the pups and kitties who visited our clinic.", color: "#625b5b", className: "" },
    items: [
      { image: `${CLOUD_URL}/1.avif`, alt: "Happy Pet 1", className: "" },
      { image: `${CLOUD_URL}/2.avif`, alt: "Happy Pet 2", className: "" },
      { image: `${CLOUD_URL}/3.avif`, alt: "Happy Pet 3", className: "" },
      { image: `${CLOUD_URL}/4.avif`, alt: "Happy Pet 4", className: "" },
      { image: `${CLOUD_URL}/5.avif`, alt: "Happy Pet 5", className: "" }
    ]
  },
  gallery: {
    section: { bg: "#fffaf8", className: "" },
    heading: { text: "See it to believe it", color: "#1e0c05", className: "" },
    description: { text: "Every photo shows care and skill. Browse our gallery to see the Petocare difference — one happy pet at a time.", color: "#625b5b", className: "" },
    styling: { arrowColor: "#8c863a", badgeBg: "#faf3ec", badgeText: "#1e0c05", className: "" },
    items: [
      { id: 1, before: `${CLOUD_URL}/b_gshps9.avif`, after: `${CLOUD_URL}/a_ivvwa8.avif`, alt: "Golden Retriever grooming", className: "" },
      { id: 2, before: `${CLOUD_URL}/bb_rqe6lx.avif`, after: `${CLOUD_URL}/aa_ox3xov.avif`, alt: "Long-haired cat grooming", className: "" },
      { id: 3, before: `${CLOUD_URL}/bbb_fhhhxy.avif`, after: `${CLOUD_URL}/aaa_hwpome.avif`, alt: "Poodle grooming", className: "" }
    ]
  },
  about: {
    section: { bg: "#fffaf8", className: "" },
    heading: { text: "We care for pets like they're our own", color: "#1e0c05", className: "" },
    description: { text: "Petocare started with a simple idea — every pet deserves loads of love, patience, and expert care. From our very first client to our thousandth, we've always put pets first.", color: "#625b5b", className: "" },
    image: { src: `${CLOUD_URL}/feature-image1_zpl2k9.avif`, className: "" },
    featuresList: { features: ["8+ years of professional pet care experience", "1,200+ happy pets served", "Trusted by families across the city"], featureColor: "#1e0c05", featureIconColor: "#8c863a", className: "" },
    cta: { label: "About Petocare", href: "#", bg: "#a35c38", text: "#ffffff", className: "" }
  },
  services: {
    section: { bg: "#faf3ec", className: "" },
    heading: { text: "Services we provide", color: "#1e0c05", className: "" },
    description: { text: "Our awesome team treats your pets like family, whether it's a quick bath or a full-on grooming and style session.", color: "#625b5b", className: "" },
    styling: { cardBg: "#ffffff", cardBorder: "#ece5de", iconColor: "#a35c38", titleColor: "#1e0c05", priceColor: "#8a4e2f", className: "" },
    items: [
      { title: "Full body grooming", description: "Complete pampering from head to tail—bath, dry, trim, and style all taken care of.", priceLabel: "From $79", iconKey: "grooming", href: "#contact", ctaLabel: "Book Now", className: "" },
      { title: "Bath & blow dry", description: "Deep cleansing bath premium a professional blow dry finish included.", priceLabel: "From $45", iconKey: "bath", href: "#contact", ctaLabel: "Book Now", className: "" },
      { title: "Haircut & styling", description: "Custom cuts and fun styles that totally match your pet's unique vibe perfectly.", priceLabel: "From $65", iconKey: "scissor", href: "#contact", ctaLabel: "Book Now", className: "" },
      { title: "Nail trimming", description: "Safe and precise nail clipping to keep your pet comfortable and healthy always.", priceLabel: "From $15", iconKey: "nail", href: "#contact", ctaLabel: "Book Now", className: "" }
    ],
    cta: { label: "View More Services", href: "#services", bg: "#a35c38", text: "#ffffff", className: "" }
  },
  process: {
    section: { bg: "#fffaf8", className: "" },
    heading: { text: "We make it simple", color: "#1e0c05", className: "" },
    description: { text: "At Petocare, we truly value your time and your pet's comfort. Our process ensures a smooth experience.", color: "#625b5b", className: "" },
    styling: { lineColor: "#a35c38", className: "" },
    steps: [
      { id: "01", title: "Book your appointment", titleColor: "#1e0c05", description: "Pick the service you want and book a convenient time that suits you—online anytime, day or night.", descColor: "#625b5b", image: `${CLOUD_URL}/1_qifxdc.avif`, className: "" },
      { id: "02", title: "Drop off your pet", titleColor: "#1e0c05", description: "Drop by our friendly studio with your pet at your appointment time & say hi to your groomer.", descColor: "#625b5b", image: `${CLOUD_URL}/2_oxpbkk.jpg`, className: "" },
      { id: "03", title: "Pick up a happy pet", titleColor: "#1e0c05", description: "Grab your freshly groomed, happy pup and enjoy the awesome, lasting results of our expert care!", descColor: "#625b5b", image: `${CLOUD_URL}/3_zubywe.jpg`, className: "" }
    ]
  },
  comparison: {
    section: { bg: "#ffffff", className: "" },
    heading: { text: "Why choose petocare", color: "#1e0c05", className: "" },
    description: { text: "We offer more than grooming — an experience of trust, expertise, and love for animals. Petocare is why owners keep returning.", color: "#625b5b", className: "" },
    vsBadge: { bg: "#a35c38", text: "#ffffff", className: "" },
    leftColumn: { bg: "#faf3ec", textColor: "#625b5b", iconColor: "#625b5b", offers: ["Untrained or uncertified staff", "Harsh chemicals and poor products", "Stressful, noisy pet environment", "No updates during your pet's session", "One-size-fits-all service packages", "Inconsistent results every visit"], className: "" },
    rightColumn: { bg: "#8c863a", textColor: "#ffffff", iconColor: "#ffffff", offers: ["Certified, professional groomers", "100% pet-safe, eco-friendly products", "Calm, welcoming, stress-free space", "Real-time session updates", "Flexible packages for your pet", "Premium quality every visit"], className: "" }
  },
  reviews: {
    section: { bg: "#fffaf8", className: "" },
    heading: { text: "The reviews say it all", color: "#1e0c05", className: "" },
    description: { text: "Our rating truly speaks for itself — but the words behind it speak even louder and clearer, expressing our commitment.", color: "#625b5b", className: "" },
    columns: {
      col1: [
          { type: "review", name: "David Chen", role: "Dog Owner", text: "“I was kinda nervous about taking Luna for grooming, but Petocare totally relaxed her and made the experience enjoyable.”", avatar: `${CLOUD_URL}/p1_wroqky.avif`, bg: "#faf3ec", textColor: "#625b5b", titleColor: "#1e0c05", starColor: "#8c863a" },
          { type: "stat-numeric", score: "4.96", scale: "/5", subtext: "5-Star Reviews: 500+", bg: "#a35c38", scoreColor: "#ffffff", textColor: "#ffffff", starColor: "#ffffff" }
      ],
      col2: [
          { type: "review", name: "James Thornton", role: "Cat Owner", text: "“Petocare truly transformed my golden retriever, Max! He looked amazing, was happy the whole time, and their exceptional care and professionalism far surpass any other groomers I've tried.”", avatar: `${CLOUD_URL}/p2_dx0rmx.avif`, bg: "#faf3ec", textColor: "#625b5b", titleColor: "#1e0c05", starColor: "#8c863a" }
      ],
      col3: [
          { type: "stat-image", image: `${CLOUD_URL}/gos_q5rxld.avif`, heading: "1200+", subtext: "Happy Pets Delivered Quarterly", bg: "#1e0c05", textColor: "#ffffff", iconColor: "#ffffff" },
          { type: "review", name: "Marcus Williams", role: "Cat Owner", text: "“As someone who owns three dogs I need a groomer I can fully trust.”", avatar: `${CLOUD_URL}/p3_sp2hha.avif`, bg: "#faf3ec", textColor: "#625b5b", titleColor: "#1e0c05", starColor: "#8c863a" }
      ]
    }
  },
  insights: {
    section: { bg: "#fffaf8", className: "" },
    heading: { text: "Pet care insights", color: "#1e0c05", className: "" },
    description: { text: "Awesome results come from a passionate team of dedicated animal lovers at Petocare.", color: "#625b5b", className: "" },
    styling: { cardBg: "#ffffff", cardTitle: "#1e0c05", cardDateBg: "#faf3ec", cardDateText: "#625b5b", className: "" },
    items: [
      { id: 1, title: "5 Signs your cat needs grooming help", date: "Mar 12, 2026", image: `${CLOUD_URL}/b1_n4dpky.avif`, className: "" },
      { id: 2, title: "How often do usually groom your dog?", date: "Apr 5, 2026", image: `${CLOUD_URL}/b2_x13qni.avif`, className: "" },
      { id: 3, title: "Keeping your pet calm during grooming", date: "May 3, 2026", image: `${CLOUD_URL}/b3_hs9zzk.avif`, className: "" }
    ]
  },
  faq: {
    section: { bg: "#faf3ec", className: "" },
    heading: { text: "Frequently Asked Questions", color: "#1e0c05", className: "" },
    description: { text: "Everything you need to know about our natural grooming process.", color: "#625b5b", className: "" },
    styling: { questionColor: "#1e0c05", answerColor: "#625b5b", iconColor: "#a35c38", dividerColor: "#ece5de", className: "" },
    items: [
      { question: "Do you use sedation or anesthesia?", answer: "No! We use a completely natural, gentle approach using calming techniques to keep your pet relaxed and comfortable.", className: "" },
      { question: "How long does the appointment take?", answer: "A standard appointment takes about 45 to 60 minutes, but we never rush. If your pet needs more time to relax, we give it to them.", className: "" },
      { question: "Is this safe for senior pets?", answer: "Absolutely. Because we don't use anesthesia, our service is highly recommended for senior pets or pets with health conditions.", className: "" }
    ]
  },
  contactSection: {
    section: { bg: "#ffffff", className: "" },
    heading: { text: "Get in Touch", color: "#1e0c05", className: "" },
    description: { text: "Have questions? Send us a message and we'll reply directly to your email.", color: "#625b5b", className: "" },
    button: { label: "Send Message", bg: "#a35c38", text: "#ffffff", className: "" }
  },
  ctaSection: {
    section: { bg: "#faf3ec", className: "" },
    heading: { text: "Book a session & feel the difference today", color: "#1e0c05", className: "" },
    description: { text: "Nothing beats seeing your happy, freshly groomed pet run to you.", color: "#625b5b", className: "" },
    image: { src: `${CLOUD_URL}/cta_zurnmb.avif`, className: "" },
    cta: { label: "Book A Schedule", href: "#contact", bg: "#a35c38", text: "#ffffff", className: "" }
  },
  footer: {
    section: { bg: "#fdfdfd", className: "" },
    logo: { src: `${CLOUD_URL}/logomain_zyihkn.avif`, alt: "Petocare Logo", className: "" },
    styling: { textColor: "#1e0c05", mutedColor: "#625b5b", iconBg: "#847e53", iconText: "#ffffff" },
    info: { 
      address: "2458 Oceanview Drive, Sunnyvale, CA 94085.", 
      phone: { label: "+1-587-302-7481", href: "tel:+15873027481" }, 
      email: { label: "hello@Petocare.com", href: "mailto:hello@Petocare.com" },
      mapEmbedUrl: "",
    },
    copyright: "Copyright © 2026 Petocare. All rights reserved.",
    socials: { facebook: "#", instagram: "#" }
  }
};

export async function createNewClient(name: string, slug: string, ownerEmail: string) {
  if (!name || !slug || !ownerEmail) return { success: false, error: "Missing fields" };
  
  try {
    await setDoc(doc(db, "websites", slug), {
      clientName: name,
      slug: slug,
      ownerEmail: ownerEmail, // 🔥 STORE THEIR REAL EMAIL HERE
      paid: false,
      template: "websiteOne", 
      customDomain: "",
      domainStatus: "none",
      isDeployed: false,
      lastUpdated: new Date().toISOString(),
      websiteOneData: defaultWebsiteOneData 
    });
    
    return { success: true, slug };
  } catch (error: any) {
    console.error("Firebase Error:", error);
    return { success: false, error: error.message };
  }
}

