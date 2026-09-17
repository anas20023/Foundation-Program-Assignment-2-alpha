import {
  CalendarDays,
  Star,
  Clock3,
  Info,
} from "lucide-react";

function getYear(date) {
  if (!date) return "N/A";

  return new Date(date).getFullYear();
}

function getRating(rating) {
  return rating?.average
    ? rating.average.toFixed(1)
    : "N/A";
}

export default function MovieCard({ movie, onDetails }) {
  const poster =
    movie.image?.original ||
    movie.image?.medium ||
    "https://placehold.co/600x900/0f172a/f97316?text=No+Poster";

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/30 hover:shadow-orange-500/5">
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-900">
        <img
          src={poster}
          alt={`${movie.name} poster`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.src =
              "https://placehold.co/600x900/0f172a/f97316?text=No+Poster";
          }}
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />

        {/* Rating */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-xs font-bold text-white backdrop-blur-md">
          <Star className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
          {getRating(movie.rating)}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onDetails(movie)}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-xl transition hover:bg-orange-400"
          >
            <Info className="h-4 w-4" />
            See Details
          </button>
        </div>
      </div>

      {/* Information */}
      <div className="p-4">
        <h2
          className="truncate text-base font-bold text-white"
          title={movie.name}
        >
          {movie.name}
        </h2>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {getYear(movie.premiered)}
          </span>

          {movie.runtime && (
            <span className="flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {movie.runtime} min
            </span>
          )}
        </div>

        {/* Mobile / normal details button */}
        <button
          type="button"
          onClick={() => onDetails(movie)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400"
        >
          <Info className="h-4 w-4" />
          See Details
        </button>
      </div>
    </article>
  );
}