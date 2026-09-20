"use client";

import { useEffect, useState } from "react";

export default function NavbarShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="group fixed top-0 left-0 right-0 z-50"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-opacity duration-300 ease-out"
        style={{ opacity: scrolled ? 1 : 0 }}
      />
      <nav className="relative max-w-7xl mx-auto flex items-center justify-between gap-4 px-6 lg:px-8 h-18 py-3.5">
        {children}
      </nav>
    </header>
  );
}
