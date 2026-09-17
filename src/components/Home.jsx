import {
  ArrowRight,
  Play,
  Search,
  Star,
  Globe2,
  Clapperboard,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const genres = [
  {
    title: "Drama",
    description: "Stories that stay with you.",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Action",
    description: "Adrenaline from start to finish.",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Comedy",
    description: "Something to make you smile.",
    image:
      "https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Adventure",
    description: "Go somewhere unexpected.",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=85",
  },
];

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center justify-center gap-4 px-5 py-7">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <p className="text-xl font-black text-white">
          {value}
        </p>

        <p className="text-xs text-slate-500">
          {label}
        </p>
      </div>
    </div>
  );
}

function GenreCard({ genre }) {
  return (
    <Link
      to="/movies"
      className="group relative min-h-60 overflow-hidden rounded-2xl border border-white/10"
    >
      <img
        src={genre.image}
        alt={genre.title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-2xl font-black text-white">
          {genre.title}
        </h3>

        <p className="mt-1 text-sm text-white/60">
          {genre.description}
        </p>
      </div>

      <div className="absolute right-4 top-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowRight className="h-4 w-4 text-white" />
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <main className="cinema-background">
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2200&q=90"
            alt="Cinema"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/30" />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />

          <div className="absolute left-[10%] top-[25%] h-72 w-72 rounded-full bg-orange-500/10 blur-[120px]" />
        </div>

        {/* Content */}
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-36 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-300 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-orange-400" />
              Discover your next favorite story
            </div>

            {/* Heading */}
            <h1 className="text-6xl font-black leading-[0.92] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[104px]">
              DISCOVER
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                GREAT STORIES.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Explore amazing shows from around the world. Search for
              your favorite titles, discover something new, and dive
              into detailed information about every show.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/movies"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-slate-950 shadow-xl shadow-orange-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-400"
              >
                <Play className="h-4 w-4 fill-current" />

                Explore Movies

                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>

              <Link
                to="/movies"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
              >
                <Search className="h-4 w-4" />
                Search Titles
              </Link>
            </div>

            {/* Info */}
            <div className="mt-12 flex flex-wrap gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                Discover highly rated shows
              </div>

              <div className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-orange-400" />
                Stories from around the world
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* ============================================================
          STATS
      ============================================================ */}
      <section className="border-y border-white/[0.07] bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4 md:divide-x md:divide-white/[0.07]">
          <StatCard
            icon={Clapperboard}
            value="10K+"
            label="Shows to explore"
          />

          <StatCard
            icon={Star}
            value="9.8"
            label="Top rated"
          />

          <StatCard
            icon={Globe2}
            value="50+"
            label="Genres & categories"
          />

          <StatCard
            icon={Zap}
            value="Fast"
            label="Easy discovery"
          />
        </div>
      </section>

      {/* ============================================================
          DISCOVERY
      ============================================================ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Text */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-400">
              Explore without limits
            </p>

            <h2 className="mt-4 text-5xl font-black leading-none tracking-tight text-white sm:text-6xl">
              SOMETHING
              <br />
              FOR EVERY
              <br />
              <span className="text-orange-400">MOOD.</span>
            </h2>

            <p className="mt-6 max-w-lg leading-7 text-slate-400">
              Whether you're looking for an emotional drama, a
              hilarious comedy, an action-packed adventure, or
              something completely unexpected, MovieExplorer helps
              you find your next watch.
            </p>

            <Link
              to="/movies"
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-white transition hover:text-orange-400"
            >
              Browse the collection
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Genre Cards */}
          <div className="grid grid-cols-2 gap-4">
            {genres.map((genre) => (
              <GenreCard
                key={genre.title}
                genre={genre}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA
      ============================================================ */}
      <section className="px-5 pb-24 sm:px-8 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/10 via-white/[0.03] to-transparent">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-orange-500/15 blur-[100px]" />

          <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
              <Clapperboard className="h-7 w-7" />
            </div>

            <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-6xl">
              READY TO FIND YOUR{" "}
              <span className="text-orange-400">
                NEXT FAVORITE?
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-slate-400">
              Start exploring the collection and discover stories
              you'll want to come back to.
            </p>

            <Link
              to="/movies"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 font-bold text-slate-950 shadow-xl shadow-orange-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-400"
            >
              Explore Movies
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}