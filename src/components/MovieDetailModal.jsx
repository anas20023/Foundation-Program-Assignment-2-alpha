import { useEffect } from "react";
import {
  X,
  Star,
  CalendarDays,
  Clock3,
  Globe2,
  Tag,
  Tv,
} from "lucide-react";

function cleanSummary(summary) {
  if (!summary) {
    return "No summary available for this show.";
  }

  return summary.replace(/<[^>]*>/g, "");
}

function formatDate(date) {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function MovieDetailModal({
  movie,
  onClose,
}) {
  useEffect(() => {
    if (!movie) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = previousOverflow;
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const poster =
    movie.image?.original ||
    movie.image?.medium ||
    "https://placehold.co/600x900/0f172a/f97316?text=No+Poster";

  const rating = movie.rating?.average
    ? movie.rating.average.toFixed(1)
    : "N/A";

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-modal-title"
    >
      <div className="relative my-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close movie details"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition hover:bg-orange-500 hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Hero */}
        <div className="relative h-64 sm:h-80">
          <img
            src={poster}
            alt={movie.name}
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-black/10" />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <h2
              id="movie-modal-title"
              className="max-w-3xl text-3xl font-black text-white sm:text-5xl"
            >
              {movie.name}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Metadata */}
          <div className="flex flex-wrap gap-2">
            <MetaItem
              icon={<Star />}
              value={rating}
              highlighted
            />

            <MetaItem
              icon={<CalendarDays />}
              value={formatDate(movie.premiered)}
            />

            {movie.runtime && (
              <MetaItem
                icon={<Clock3 />}
                value={`${movie.runtime} min`}
              />
            )}

            {movie.language && (
              <MetaItem
                icon={<Globe2 />}
                value={movie.language}
              />
            )}
          </div>

          {/* Genres */}
          {movie.genres?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-300"
                >
                  <Tag className="h-3 w-3" />
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Summary */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-white">
              Overview
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              {cleanSummary(movie.summary)}
            </p>
          </div>

          {/* Additional info */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {movie.network?.name && (
              <InfoRow
                icon={<Tv />}
                label="Network"
                value={movie.network.name}
              />
            )}

            {movie.status && (
              <InfoRow
                icon={<span className="h-2 w-2 rounded-full bg-emerald-400" />}
                label="Status"
                value={movie.status}
              />
            )}
          </div>

          {/* Close */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaItem({
  icon,
  value,
  highlighted = false,
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${highlighted
          ? "border-orange-500/20 bg-orange-500/10 text-orange-300"
          : "border-white/10 bg-white/5 text-slate-300"
        }`}
    >
      <span className="h-4 w-4">
        {icon}
      </span>

      {value}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-orange-400">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-500">
          {label}
        </p>

        <p className="mt-0.5 text-sm font-semibold capitalize text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}