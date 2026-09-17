import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt3, HiX, HiFilm, HiArrowRight } from "react-icons/hi";

const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
];

const MOVIES_PATH = "/movies";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Solid background once the user scrolls
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close on desktop resize, Escape key, and lock body scroll while open
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setIsOpen(false);
        };
        const handleKeyDown = (event) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = isOpen ? "hidden" : "";

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <nav
            aria-label="Main navigation"
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || isOpen
                    ? "border-b border-base-300 bg-base-100/90 py-3 shadow-lg backdrop-blur-xl"
                    : "bg-transparent py-5"
                }`}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
                <Link
                    to="/"
                    aria-label="MovieHub — home"
                    className="group flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                >
                    <span className="flex h-9 w-9 items-center justify-center bg-primary text-primary-content">
                        <HiFilm className="text-xl" aria-hidden="true" />
                    </span>
                    <span className="text-lg font-black tracking-tight text-base-content transition-colors group-hover:text-primary sm:text-xl">
                        Movie<span className="text-primary">Hub</span>
                    </span>
                </Link>


                <div className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.to}
                            className={({ isActive }) =>
                                `group/link relative text-sm font-semibold transition-colors ${isActive
                                    ? "text-primary"
                                    : "text-base-content/70 hover:text-primary"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}
                                    <span
                                        className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover/link:w-full"
                                            }`}
                                    />
                                </>
                            )}
                        </NavLink>
                    ))}

                    {/* Prominent Movies CTA */}
                    <Link
                        to={MOVIES_PATH}
                        className="group/cta inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-bold text-primary-content transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
                    >
                        <HiFilm aria-hidden="true" />
                        Movies
                        <HiArrowRight
                            className="transition-transform duration-300 group-hover/cta:translate-x-1"
                            aria-hidden="true"
                        />
                    </Link>
                </div>


                <button
                    type="button"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex h-10 w-10 items-center justify-center text-3xl text-base-content lg:hidden"
                >
                    {isOpen ? <HiX /> : <HiMenuAlt3 />}
                </button>
            </div>


            <div
                id="mobile-navigation"
                className={`fixed inset-x-0 top-[61px] z-40 h-[calc(100dvh-61px)] overflow-y-auto bg-base-100 px-6 py-10 transition-transform duration-300 ease-out lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `w-full max-w-xs text-center text-xl font-bold transition-colors sm:text-2xl ${isActive ? "text-primary" : "text-base-content hover:text-primary"
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}

                    <Link
                        to={MOVIES_PATH}
                        onClick={() => setIsOpen(false)}
                        className="mt-2 inline-flex w-full max-w-xs items-center justify-center gap-2 bg-primary px-6 py-4 text-sm font-bold text-primary-content transition-all hover:bg-primary/90 active:scale-[0.98]"
                    >
                        <HiFilm className="text-lg" aria-hidden="true" />
                        Movies
                        <HiArrowRight aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}