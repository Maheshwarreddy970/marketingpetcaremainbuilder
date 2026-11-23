"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import {
  Home,
  Briefcase,
  Calendar,
  User,
  Star,
  Plus,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import PawIcon from "@/icons/icon1";
import { cn } from "@/lib/utils";
import { optimizeCloudinaryImage } from "@/lib/optimize-image";

type NavItem = { label: string; href: string };
type MobileNavItem = NavItem & { icon: LucideIcon };

const MAIN_LINKS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Service", href: "/services" },
];

const ALL_PAGES: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Service", href: "/services" },
  { label: "Service Details", href: "/service-details" },
  { label: "Review", href: "/reviews" },
];

const getHelpCenter = (bookingHref: string): NavItem[] => [
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Condition", href: "/terms-and-condition" },
  { label: "Contact", href: "/contact" },
  { label: "Book", href: bookingHref },
];

const getMobileLinks = (bookingHref: string): MobileNavItem[] => [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: User },
  { label: "Service", href: "/services", icon: Briefcase },
  { label: "Review", href: "/reviews", icon: Star },
  { label: "Book", href: bookingHref, icon: Calendar },
];

export default function Navbar({ data, slug }: { data: any; slug?: string }) {
  const pathname = usePathname() || "/";
  const params = useParams();
  const { ref, inView } = useInView({ threshold: 0, initialInView: true });
  const isScrolled = !inView;

  // Automatically detect tenant slug from prop OR URL route param ([slug])
  const rawSlug = slug || (typeof params?.slug === "string" ? params.slug : "");
  const resolvedSlug = rawSlug ? decodeURIComponent(rawSlug) : "";

  // Prefix with /<slug> ONLY on path-based URLs (e.g. localhost:3000/luminous-goldens)
  // On custom domains (pettowngrooming.com) or subdomains, basePath stays ""
  const isPathBased =
    Boolean(resolvedSlug) &&
    (pathname === `/${resolvedSlug}` || pathname.startsWith(`/${resolvedSlug}/`));

  const basePath = isPathBased ? `/${resolvedSlug}` : "";

  const resolveHref = (href: string) => {
    if (!href) return basePath || "/";
    if (
      href.startsWith("#") ||
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return href;
    }
    if (href === "/") return basePath || "/";
    const clean = href.startsWith("/") ? href : `/${href}`;
    return `${basePath}${clean}`;
  };

  const homeHref = resolveHref("/");

  // Track URL Hash for `#gallery`, `#services`, `#reviews`, etc.
  const [activeHash, setActiveHash] = useState("");

  // Desktop "All Pages" dropdown
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mobile top menu drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Entry animation states
  const [isMounted, setIsMounted] = useState(false);
  const [animationsDone, setAnimationsDone] = useState(false);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsOpen(true);
  };
  const closeMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setIsOpen(false), 150);
  };
  const closeMenuNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsOpen(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSectionId = "";

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          window.scrollY >= sectionTop - 150 &&
          window.scrollY < sectionTop + sectionHeight - 150
        ) {
          currentSectionId = `#${section.id}`;
        }
      });

      if (window.scrollY < 100) {
        const firstSection = sections[0];
        currentSectionId = firstSection ? `#${firstSection.id}` : "/";
      }

      if (currentSectionId) {
        setActiveHash((prev) => (prev === currentSectionId ? prev : currentSectionId));
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    const t1 = setTimeout(() => setIsMounted(true), 50);
    const t2 = setTimeout(() => setAnimationsDone(true), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen && !mobileMenuOpen) return;

    const handleOutside = (e: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, mobileMenuOpen]);

  if (!data) return null;

  const logo = data.logo || { src: "", alt: "Logo" };
  const bookingHref: string = resolveHref(data.cta?.href || "#");

  const navBg = data.section?.bg || data.bg || "transparent";
  const surfaceBg = navBg && navBg !== "transparent" ? navBg : "#ffffff";
  const linkColor = data.styling?.linkColor || data.linkColor || "#625b5b";
  const hoverColor = data.styling?.linkHoverColor || data.linkHoverColor || "#1e0c05";

  const helpCenterLinks = getHelpCenter(bookingHref);
  const mobileLinks = getMobileLinks(bookingHref);

  const isLinkActive = (rawHref: string) => {
    const href = resolveHref(rawHref);
    if (href.startsWith("#")) return activeHash === href;
    if (href === homeHref) return pathname === homeHref;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLinkClick = (rawHref: string) => {
    if (rawHref.startsWith("#")) setActiveHash(rawHref);
    closeMenuNow();
  };

  const fadeDownAnim = cn(
    animationsDone ? "" : "transition-all duration-1000 ease-out transform",
    isMounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
  );

  const fadeUpAnim = cn(
    animationsDone ? "" : "transition-all duration-1000 ease-out transform",
    isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  );

  const renderDropdownColumn = (title: string, items: NavItem[], compact = false) => (
    <div>
      <p
        className={cn(compact ? "text-xs uppercase tracking-wider font-semibold mb-2.5" : "text-[15px] mb-3")}
        style={{ color: linkColor, opacity: 0.8 }}
      >
        {title}
      </p>
      <ul className="flex flex-col">
        {items.map((item) => {
          const finalHref = resolveHref(item.href);
          const active = isLinkActive(item.href);
          return (
            <li key={item.label}>
              <a
                href={finalHref}
                onClick={() => handleLinkClick(item.href)}
                className={cn(
                  "block rounded-lg transition-colors duration-200 hover:bg-black/5",
                  compact ? "-mx-2 px-2 py-2 text-[14px]" : "-mx-3 px-3 py-2.5 text-[15px]"
                )}
                style={{
                  color: hoverColor,
                  fontWeight: active ? 600 : 500,
                  backgroundColor: active ? `${hoverColor}0D` : undefined,
                }}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <>
      <div ref={ref} className="absolute top-0 left-0 w-full h-screen pointer-events-none -z-10 bg-transparent" />

      {/* DESKTOP TOP NAVIGATION */}
      <nav
        aria-label="Primary navigation"
        className={cn(
          "hidden md:block fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-300",
          isScrolled && "backdrop-blur-xl",
          data.section?.className
        )}
        style={
          {
            "--nav-link": linkColor,
            "--nav-hover": hoverColor,
          } as React.CSSProperties
        }
      >
        <div className="px-6 md:px-12 lg:px-24 xl:px-40 py-3 flex items-center justify-between relative">
          {/* LOGO */}
          <div className={fadeDownAnim} style={{ transitionDelay: animationsDone ? "0ms" : "100ms" }}>
            <a href={homeHref} className={cn("relative flex items-center justify-start", logo.className)}>
              {logo.src ? (
                <img
                  src={optimizeCloudinaryImage(logo.src, 400)}
                  alt={logo.alt || "Business Logo"}
                  width={160}
                  height={48}
                  className="w-40 h-12 max-w-full object-contain object-left transition-all"
                />
              ) : (
                <PawIcon className="h-11 w-11" style={{ color: data.cta?.bg }} />
              )}
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* NAV PILL + ALL PAGES DROPDOWN */}
            <div
              ref={menuRef}
              className={cn("relative", fadeDownAnim)}
              style={{ transitionDelay: animationsDone ? "0ms" : "200ms" }}
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
            >
              <div
                className="flex items-center rounded-2xl p-1.5 gap-1 shadow-sm border backdrop-blur-md"
                style={{ backgroundColor: navBg, borderColor: hoverColor + "20" }}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[15px] font-medium transition-colors duration-200 hover:bg-black/5"
                  style={{
                    color: isOpen ? hoverColor : linkColor,
                    backgroundColor: isOpen ? `${hoverColor}10` : undefined,
                  }}
                >
                  All Pages
                  <Plus
                    size={16}
                    strokeWidth={2}
                    className={cn("transition-transform duration-300", isOpen && "rotate-45")}
                  />
                </button>

                {MAIN_LINKS.map((link) => {
                  const finalHref = resolveHref(link.href);
                  const isActive = isLinkActive(link.href);
                  return (
                    <a
                      key={link.label}
                      href={finalHref}
                      onClick={() => handleLinkClick(link.href)}
                      className="px-4 py-2 rounded-xl text-[15px] transition-colors duration-200 hover:bg-black/5"
                      style={{
                        backgroundColor: isActive ? `${hoverColor}10` : undefined,
                        color: isActive ? hoverColor : linkColor,
                        fontWeight: isActive ? 500 : 400,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = isActive ? hoverColor : linkColor)
                      }
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              {/* DESKTOP DROPDOWN CARD */}
              <div
                className={cn(
                  "absolute top-full pt-3 right-0 xl:right-auto xl:left-0 transition-all duration-200 ease-out",
                  isOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-1 pointer-events-none"
                )}
                style={{ width: 520, maxWidth: "calc(100vw - 3rem)" }}
              >
                <div
                  className="bg-white rounded-2xl shadow-xl border px-10 py-9 grid grid-cols-2 gap-x-10"
                  style={{ borderColor: hoverColor + "15" }}
                >
                  {renderDropdownColumn("All Pages", ALL_PAGES)}
                  {renderDropdownColumn("Help Center", helpCenterLinks)}
                </div>
              </div>
            </div>

            {/* CTA BUTTON */}
            <div className={fadeDownAnim} style={{ transitionDelay: animationsDone ? "0ms" : "300ms" }}>
              <a
                href={bookingHref}
                className={cn(
                  "group flex items-center gap-2.5 text-sm font-medium pl-5 pr-2 py-2 rounded-full cursor-pointer",
                  "transition-all duration-300 hover:brightness-110 hover:shadow-md active:scale-[0.97]",
                  data.cta?.className
                )}
                style={{ backgroundColor: data.cta?.bg, color: data.cta?.text }}
              >
                {data.cta?.label || "Book Now"}
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-white/30">
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M.6 4.602h10m-4-4 4 4-4 4"
                      stroke={data.cta?.text || "#ffffff"}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE TOP HEADER (Logo + Hamburger Menu Button) */}
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 px-4 py-3 bg-transparent transition-all duration-300 md:hidden",
          (isScrolled || mobileMenuOpen) && "backdrop-blur-xl",
          data.section?.className
        )}
      >
        <div
          className={cn("flex items-center justify-between gap-3", fadeDownAnim)}
          style={{ transitionDelay: animationsDone ? "0ms" : "100ms" }}
        >
          <a href={homeHref} className={cn("relative flex items-center", logo.className)}>
            {logo.src ? (
              <img
                src={optimizeCloudinaryImage(logo.src, 400)}
                alt={logo.alt || "Business Logo"}
                width={128}
                height={48}
                className="w-32 h-12 max-w-full object-contain object-left transition-all"
              />
            ) : (
              <PawIcon className="h-10 w-10" style={{ color: data.cta?.bg }} />
            )}
          </a>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-sm font-medium shadow-sm backdrop-blur-md transition-all duration-200 active:scale-95"
            style={{
              backgroundColor: surfaceBg,
              borderColor: hoverColor + "20",
              color: hoverColor,
            }}
          >
            <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
            {mobileMenuOpen ? (
              <X size={18} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Menu size={18} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU BACKDROP */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] md:hidden"
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* MOBILE TOP DROPDOWN PANEL (All Pages + Help Center + CTA) */}
      <nav
        id="mobile-nav-drawer"
        aria-label="Mobile menu"
        className={cn(
          "fixed top-[72px] inset-x-4 z-50 md:hidden transition-all duration-200 ease-out origin-top",
          mobileMenuOpen
            ? "opacity-100 visible translate-y-0 scale-100"
            : "opacity-0 invisible -translate-y-2 scale-[0.98] pointer-events-none"
        )}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl border p-6 max-h-[calc(100dvh-170px)] overflow-y-auto"
          style={{ borderColor: hoverColor + "18" }}
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {renderDropdownColumn("All Pages", ALL_PAGES, true)}
            {renderDropdownColumn("Help Center", helpCenterLinks, true)}
          </div>

          <div className="mt-5 pt-4 border-t" style={{ borderColor: hoverColor + "15" }}>
            <a
              href={bookingHref}
              onClick={closeMenuNow}
              className={cn(
                "w-full flex items-center justify-center gap-2.5 text-sm font-medium py-3 px-5 rounded-full transition-all duration-200 active:scale-[0.98]",
                data.cta?.className
              )}
              style={{ backgroundColor: data.cta?.bg || "#a35c38", color: data.cta?.text || "#ffffff" }}
            >
              <span>{data.cta?.label || "Book Now"}</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="11" height="9" viewBox="0 0 12 10" fill="none" aria-hidden="true">
                  <path
                    d="M.6 4.602h10m-4-4 4 4-4 4"
                    stroke={data.cta?.text || "#ffffff"}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav
        aria-label="Mobile bottom navigation"
        className={cn(
          "md:hidden fixed inset-x-0 bg-white bottom-4 mx-auto z-50 w-fit max-w-[95vw] border rounded-full flex items-center p-1.5 shadow-xl space-x-1",
          fadeUpAnim
        )}
        style={{
          backgroundColor: surfaceBg,
          borderColor: hoverColor + "20",
          transitionDelay: animationsDone ? "0ms" : "400ms",
        }}
      >
        {mobileLinks.map((link) => {
          const Icon = link.icon;
          const finalHref = resolveHref(link.href);
          const isActive = isLinkActive(link.href);

          return (
            <a
              key={link.label}
              href={finalHref}
              aria-label={link.label}
              onClick={() => handleLinkClick(link.href)}
              className={cn(
                "flex items-center gap-0 px-3 py-0.5 rounded-full transition-all duration-300 relative h-10 min-w-[44px]",
                isActive ? "gap-2 px-3.5" : ""
              )}
              style={{
                backgroundColor: isActive ? `${hoverColor}10` : "transparent",
                color: isActive ? hoverColor : linkColor,
              }}
            >
              <Icon size={20} strokeWidth={2} className="flex-shrink-0" aria-hidden="true" />
              <div
                className="overflow-hidden flex items-center transition-all duration-300 ease-in-out"
                style={{
                  width: isActive ? "64px" : "0px",
                  opacity: isActive ? 1 : 0,
                  marginLeft: isActive ? "4px" : "0px",
                }}
              >
                <span className="font-medium text-xs capitalize whitespace-nowrap overflow-hidden text-ellipsis leading-relaxed">
                  {link.label}
                </span>
              </div>
            </a>
          );
        })}
      </nav>
    </>
  );
}