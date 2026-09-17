import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Clapperboard,
  ArrowRight,
} from "lucide-react";

const navLinks = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Movies",
    to: "/movies",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleEscape);

    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "border-b border-white/10 bg-slate-950/85 py-3 shadow-xl backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/20 transition duration-300 group-hover:scale-105">
            <Clapperboard className="h-5 w-5" />
          </div>

          <span className="text-xl font-black tracking-tight text-white">
            Movie<span className="text-orange-400">Explorer</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative py-2 text-sm font-medium transition ${
                  isActive
                    ? "text-orange-400"
                    : "text-slate-400 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}

                  <span
                    className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-orange-500 transition-all duration-300 ${
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}

          <Link
            to="/movies"
            className="group flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-400"
          >
            <Clapperboard className="h-4 w-4" />

            Explore

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 right-0 top-full overflow-hidden border-b border-white/10 bg-slate-950/95 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-md flex-col gap-2 px-5 py-7">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-5 py-4 text-center font-semibold transition ${
                  isActive
                    ? "bg-orange-500/10 text-orange-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/movies"
            onClick={() => setIsOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-4 font-bold text-slate-950"
          >
            <Clapperboard className="h-5 w-5" />
            Explore Movies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}