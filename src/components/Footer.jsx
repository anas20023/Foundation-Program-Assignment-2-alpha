import { FaClapperboard, FaGithub } from "react-icons/fa6"

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-black/20">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:px-8 md:flex-row lg:px-10">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-black">
                        <FaClapperboard className="h-4 w-4" />
                    </div>

                    <span className="font-semibold text-white">
                        Movie<span className="text-orange-400">Explorer</span>
                    </span>
                </div>

                <p className="text-center text-sm text-slate-500">
                    © 2026 MovieExplorer. Built with React & TVMaze.
                </p>

                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                    <FaGithub className="h-5 w-5" />
                </a>
            </div>
        </footer>
    )
}

export default Footer
