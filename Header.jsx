import { useEffect, useState } from "react";
import { SITE } from "../../data/site";
import { Menu, X, Coffee } from "lucide-react";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Listen", href: "#listen" },
  { label: "Episodes", href: "#episodes" },
  { label: "Merch", href: "#merch" },
  { label: "Connect", href: "#connect" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F5E9D7]/85 backdrop-blur-xl border-b border-[#4F2247]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-3 group"
          data-testid="header-logo"
        >
          <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#4F2247]/15 shadow-cozy">
            <img
              src={SITE.brand.logoUrl}
              alt="Awkwardish logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-display text-2xl font-semibold text-[#341434] tracking-tight">
            Awkward<span className="italic text-[#E0578F]">ish</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={`nav-link-${n.label.toLowerCase()}`}
              className="nav-link text-[15px] font-medium text-[#341434]/80 hover:text-[#341434]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={SITE.support.url}
            target="_blank"
            rel="noreferrer"
            data-testid="header-kofi-cta"
            aria-label="Tip on Ko-fi"
            className="btn-press inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F0A6BF] text-[#341434] font-semibold text-sm hover:bg-[#E0578F] hover:text-[#F5E9D7] border border-[#341434]/10"
          >
            <Coffee size={15} />
            Tip
          </a>
          <a
            href={SITE.merch.url}
            target="_blank"
            rel="noreferrer"
            data-testid="header-merch-cta"
            className="btn-press inline-flex items-center px-5 py-2.5 rounded-full bg-[#341434] text-[#F5E9D7] font-semibold text-sm hover:bg-[#4F2247]"
          >
            Shop Merch
          </a>
        </div>

        <button
          aria-label="Open menu"
          data-testid="mobile-menu-toggle"
          className="md:hidden p-2 rounded-full text-[#341434] hover:bg-[#4F2247]/8"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden bg-[#F5E9D7]/97 backdrop-blur-xl border-t border-[#4F2247]/10"
          data-testid="mobile-menu"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-${n.label.toLowerCase()}`}
                className="text-lg font-medium text-[#341434]"
              >
                {n.label}
              </a>
            ))}
            <a
              href={SITE.support.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              data-testid="mobile-kofi-cta"
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#F0A6BF] text-[#341434] font-semibold border border-[#341434]/10"
            >
              <Coffee size={16} />
              Tip on Ko‑fi
            </a>
            <a
              href={SITE.merch.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              data-testid="mobile-merch-cta"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#341434] text-[#F5E9D7] font-semibold"
            >
              Shop Merch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
