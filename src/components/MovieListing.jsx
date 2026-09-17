/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  Film,
  RefreshCw,
} from "lucide-react";
import axios from "axios";

import MovieCard from "./MovieCard";
import MovieDetailModal from "./MovieDetailModal";

const TVMAZE_API = "https://api.tvmaze.com";

export default function MovieListing() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllMovies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${TVMAZE_API}/shows`
      );

      setMovies(response.data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load movies right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  const searchMovies = async (query) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${TVMAZE_API}/search/shows`,
        {
          params: {
            q: query,
          },
        }
      );

      const results = response.data.map(
        (item) => item.show
      );

      setMovies(results);
    } catch (err) {
      console.error(err);

      setError(
        "Something went wrong while searching."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = searchQuery.trim();

    if (!query) {
      fetchAllMovies();
      return;
    }

    const timer = setTimeout(() => {
      searchMovies(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <main className="min-h-screen bg-slate-950 pb-24 pt-28">
      {/* ============================================================
          PAGE HEADER
      ============================================================= */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-300">
            <Film className="h-3.5 w-3.5" />
            Movie Collection
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Explore{" "}
            <span className="text-orange-400">
              Movies & Shows
            </span>
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            Browse popular shows, search for your favorite
            titles, and discover something new to watch.
          </p>
        </div>

        {/* ========================================================
            SEARCH
        ========================================================= */}
        <div className="mt-10">
          <div className="relative max-w-3xl">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search for a movie or show..."
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.05] pl-14 pr-14 text-white outline-none backdrop-blur-md transition placeholder:text-slate-600 focus:border-orange-500/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-orange-500/10"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* ========================================================
            RESULTS HEADER
        ========================================================= */}
        <div className="mt-10 flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="font-bold text-white">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : "All Shows"}
            </h2>

            {!loading && (
              <p className="mt-1 text-xs text-slate-500">
                {movies.length} results
              </p>
            )}
          </div>

          <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
            <SlidersHorizontal className="h-4 w-4" />
            Discover
          </div>
        </div>
      </section>

      {/* ============================================================
          MOVIE GRID
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 lg:px-10">
        {loading ? (
          <LoadingGrid />
        ) : error ? (
          <ErrorState
            error={error}
            onRetry={
              searchQuery
                ? () => searchMovies(searchQuery)
                : fetchAllMovies
            }
          />
        ) : movies.length === 0 ? (
          <EmptyState
            query={searchQuery}
            onClear={handleClearSearch}
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onDetails={setSelectedMovie}
              />
            ))}
          </div>
        )}
      </section>

      {/* ============================================================
          MODAL
      ========================================================= */}
      <MovieDetailModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </main>
  );
}

/* ======================================================================
   LOADING
====================================================================== */

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
        >
          <div className="aspect-[2/3] animate-pulse bg-slate-800" />

          <div className="space-y-3 p-4">
            <div className="h-4 animate-pulse rounded bg-slate-800" />

            <div className="h-3 w-2/3 animate-pulse rounded bg-slate-800" />

            <div className="h-10 animate-pulse rounded-xl bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ======================================================================
   ERROR
====================================================================== */

function ErrorState({ error, onRetry }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
        <RefreshCw className="h-6 w-6" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-white">
        Something went wrong
      </h2>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        {error}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}

/* ======================================================================
   EMPTY STATE
====================================================================== */

function EmptyState({ query, onClear }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-slate-500">
        <Search className="h-6 w-6" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-white">
        No results found
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        We couldn't find anything matching "{query}".
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-6 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        Clear Search
      </button>
    </div>
  );
}