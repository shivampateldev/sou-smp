import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "@/types";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useTheme } from "@/lib/theme-provider";
import { motion, AnimatePresence } from "framer-motion";
import { LOGOS } from "@/lib/logos";

/* ---------------- NAV STRUCTURE ---------------- */

const NAV_ITEMS: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About",
    children: [
      { title: "IEEE", href: "/about/ieee" },
      { title: "IEEE SOU SB", href: "/about/ieee-sou-sb" },
      {
        title: "CHAPTER",
        children: [
          { title: "IEEE SOU SPS SBC", href: "/about/ieee-sou-sps-sbc" },
          { title: "IEEE SOU CS SBC", href: "/about/ieee-sou-cs-sbc" },
        ],
      },
      {
        title: "GROUP",
        children: [
          { title: "IEEE SOU WIE SB AG", href: "/about/ieee-sou-wie-sb-ag" },
          { title: "IEEE SOU SIGHT SBG", href: "/about/ieee-sou-sight-sbg" },
        ],
      },
      { title: "Our SIGs", href: "/sigs" },
    ],
  },
  { title: "Events", href: "/events" },
  {
    title: "Team",
    children: [
      { title: "Faculty Advisor", href: "/team/faculty-advisor" },
      { title: "Advisory Board", href: "/team/advisory-board" },
      { title: "Executive Members", href: "/team/executive-members" },
      { title: "Core Members", href: "/team/core-members" },
    ],
  },
  {
    title: "Achievement",
    children: [
      { title: "Branch Awards", href: "/achievement/branch-awards" },
      { title: "Newsletter", href: "/achievement/newsletter" },
      { title: "Student Achievement", href: "/achievement/student" },
    ],
  },
  { title: "Blogs", href: "/blogs" },
  { title: "Bylaws", href: "/bylaws" },
  { title: "Contact Us", href: "/contact" },
];

const HOVER_THEMES: Record<string, string> = {
  "IEEE": "hover:bg-blue-50/50 hover:text-blue-600 dark:hover:bg-blue-900/20",
  "IEEE SOU SB": "hover:bg-blue-50/50 hover:text-blue-600 dark:hover:bg-blue-900/20",
  "IEEE SOU SPS SBC": "hover:bg-green-50/50 hover:text-green-600 dark:hover:bg-green-900/20",
  "IEEE SOU CS SBC": "hover:bg-orange-50/50 hover:text-orange-600 dark:hover:bg-orange-900/20",
  "IEEE SOU WIE SB AG": "hover:bg-purple-50/50 hover:text-purple-600 dark:hover:bg-purple-900/20",
  "IEEE SOU SIGHT SBG": "hover:bg-orange-50/50 hover:text-orange-600 dark:hover:bg-orange-900/20"
};

/* ---------------- COMPONENT ---------------- */

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleMobileDropdownToggle = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ═══════════════ MAIN NAVBAR ═══════════════ */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 py-0",
          isScrolled
            ? "bg-white dark:bg-[#000814]/95 shadow-lg dark:backdrop-blur-md"
            : "bg-white dark:bg-[#000814]"
        )}
      >
        {/* TOP TIER: Logos (Desktop Only) */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="hidden lg:block border-b border-border bg-white dark:bg-[#000814] transition-colors duration-300 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between">
                  {/* Centered Logo */}
                  <div className="flex items-center justify-center w-full">
                    {theme === "dark" ? (
                      <div className="flex items-center justify-center gap-4 h-12 sm:h-14 lg:h-[55px]">
                        <img
                          src="http://ieee.socet.edu.in/wp-content/uploads/2026/03/N-SOU-X-NAAC-Logo-NW-SOU-X-NAAC-Logo.png"
                          alt="Silver Oak Logo"
                          className="h-full w-auto object-contain"
                        />
                        <img
                          src="http://ieee.socet.edu.in/wp-content/uploads/2026/03/IEEE-New-Logo-White-scaled.png"
                          alt="IEEE Logo"
                          className="h-full w-auto object-contain"
                        />
                      </div>
                    ) : (
                      <img
                        src={LOGOS.LIGHT.IEEESOUSSB}
                        alt="Silver Oak University IEEE Student Branch"
                        className="h-12 sm:h-14 lg:h-[55px] w-auto object-contain mix-blend-multiply"
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTTOM TIER: Navigation (Standard and Minimal when Scrolled) */}
        <div className="max-w-[1440px] mx-auto relative px-4">
          <div className={cn(
            "flex items-center transition-all duration-500",
            isScrolled ? "h-[60px]" : "h-[70px] lg:h-[80px]"
          )}>
            
            {/* Left: Logo (Visible when scrolled or on mobile) */}
            <div className={cn(
              "flex-shrink-0 transition-all duration-300 overflow-hidden",
              // Unified width scaling allowing absolute maximum height based expansion
              isScrolled ? "w-max" : "w-max lg:w-0"
            )}>
              <Link to="/" className="flex items-center group w-max">
                {theme === "dark" ? (
                  <div className={cn(
                    "flex items-center gap-2 transition-all duration-300 group-hover:scale-105",
                    isScrolled ? "h-6 md:h-8 w-max" : "h-10 sm:h-12 md:h-14 w-max"
                  )}>
                    <img
                      src="http://ieee.socet.edu.in/wp-content/uploads/2026/03/N-SOU-X-NAAC-Logo-NW-SOU-X-NAAC-Logo.png"
                      alt="Silver Oak Logo"
                      className="h-full w-auto object-contain shrink-0"
                    />
                    <img
                      src="http://ieee.socet.edu.in/wp-content/uploads/2026/03/IEEE-New-Logo-White-scaled.png"
                      alt="IEEE Logo"
                      className="h-full w-auto object-contain shrink-0"
                    />
                  </div>
                ) : (
                  <img
                    src={LOGOS.LIGHT.IEEESOUSSB}
                    className={cn(
                      "transition-all duration-300 group-hover:scale-105 w-auto mix-blend-multiply",
                      isScrolled 
                        ? "h-11 md:h-[48px] max-w-[180px] md:max-w-[240px] xl:max-w-[280px] object-contain" 
                        : "h-14 md:h-[55px] max-w-[220px] md:max-w-[280px] xl:max-w-[320px] object-contain"
                    )}
                    alt="IEEE SOU SB"
                  />
                )}
              </Link>
            </div>

            {/* Center: Navigation Menu (Desktop Only) */}
            <nav className="hidden lg:flex flex-1 items-center justify-center space-x-1 lg:px-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.title} className="relative group">
                  {item.children ? (
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger className={cn(
                            "text-xs xl:text-sm font-semibold transition-all duration-300 px-3 xl:px-4 py-2 hover:bg-primary/5 rounded-md",
                            isActive(item.href || "") ? "text-primary" : "text-foreground dark:text-gray-300"
                          )}>
                            {item.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="w-64 p-3 bg-white dark:bg-slate-900 border border-border/50 rounded-lg shadow-xl">
                              {item.children.map((child) => (
                                <React.Fragment key={child.title}>
                                  {child.children ? (
                                    <>
                                      <p className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center border-b border-border/10 mb-1">
                                        {child.title}
                                      </p>
                                      {child.children.map((nested) => (
                                        <NavigationMenuLink asChild key={nested.title}>
                                          <Link
                                            to={nested.href}
                                            className={cn(
                                              "block px-3 py-2 text-sm rounded-md transition-all duration-200 hover:translate-x-1",
                                              HOVER_THEMES[nested.title] || "hover:bg-accent text-foreground"
                                            )}
                                          >
                                            {nested.title}
                                          </Link>
                                        </NavigationMenuLink>
                                      ))}
                                    </>
                                  ) : (
                                    <NavigationMenuLink asChild>
                                      <Link
                                        to={child.href}
                                        className={cn(
                                          "block px-3 py-2 text-sm rounded-md transition-all duration-200 hover:translate-x-1",
                                          HOVER_THEMES[child.title] || "hover:bg-accent text-foreground"
                                        )}
                                      >
                                        {child.title}
                                      </Link>
                                    </NavigationMenuLink>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  ) : (
                    <Link
                      to={item.href || "/"}
                      className={cn(
                        "relative px-3 xl:px-4 py-2 text-xs xl:text-sm font-semibold transition-all duration-300 hover:text-primary whitespace-nowrap",
                        isActive(item.href || "") 
                          ? "text-primary dark:text-white" 
                          : "text-foreground dark:text-gray-300"
                      )}
                    >
                      {item.title}
                      {isActive(item.href || "") && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute bottom-0 left-3 xl:left-4 right-3 xl:right-4 h-0.5 bg-primary"
                        />
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: Actions & Mobile Toggle */}
            <div className={cn(
              "flex items-center justify-end gap-2 sm:gap-4 transition-all duration-500",
              isScrolled ? "w-[200px]" : "w-auto lg:w-0"
            )}>
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="transition-all duration-300 hover:scale-110 h-9 w-9 xl:h-10 xl:w-10 text-foreground dark:text-gray-300"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </Button>

              {/* Join Button (Desktop Scrolled) */}
              {isScrolled && (
                <Button variant="outline" size="sm" asChild className="hidden xl:flex transition-all duration-300 hover:scale-105 bg-blue-600 text-white hover:bg-white hover:text-blue-600 border-none shadow-md px-6">
                  <Link to="/join">Join IEEE</Link>
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="transition-all duration-300 hover:scale-110 text-foreground dark:text-gray-300 h-9 w-9"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════ MOBILE MENU ═══════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Side Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-[80vw] max-w-sm h-full bg-white dark:bg-[#000814] shadow-2xl overflow-y-auto"
            >
              <div className="p-6 pt-24 space-y-2">
                {NAV_ITEMS.map((item) => (
                  <div key={item.title}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => handleMobileDropdownToggle(item.title)}
                          className={cn(
                            "flex items-center justify-between w-full py-3 px-4 text-base font-bold rounded-lg transition-all",
                            openDropdown === item.title ? "bg-primary/10 text-primary" : "text-foreground"
                          )}
                        >
                          {item.title}
                          <ChevronDown className={cn(
                            "h-5 w-5 transition-transform duration-300",
                            openDropdown === item.title && "rotate-180"
                          )} />
                        </button>

                        <div className={cn(
                          "overflow-hidden transition-all duration-300",
                          openDropdown === item.title ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                        )}>
                          <div className="pl-6 space-y-1 py-2">
                            {item.children.map((child) => (
                              <React.Fragment key={child.title}>
                                {child.children ? (
                                  <>
                                    <p className="px-4 py-3 text-xs font-black text-muted-foreground uppercase tracking-[0.2em] border-l-2 border-primary/20">
                                      {child.title}
                                    </p>
                                    {child.children.map((nested) => (
                                      <Link
                                        key={nested.title}
                                        to={nested.href}
                                        className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        {nested.title}
                                      </Link>
                                    ))}
                                  </>
                                ) : (
                                  <Link
                                    to={child.href}
                                    className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {child.title}
                                  </Link>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        to={item.href || "/"}
                        className={cn(
                          "block py-3 px-4 text-base font-bold rounded-lg transition-all",
                          isActive(item.href || "") ? "bg-primary text-white" : "text-foreground hover:bg-accent"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="pt-8 px-4">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 text-lg font-bold shadow-lg shadow-blue-500/20">
                    <Link to="/join" onClick={() => setIsMobileMenuOpen(false)}>Join IEEE</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}