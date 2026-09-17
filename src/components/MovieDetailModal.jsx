import React, { useEffect } from 'react';
import { X, Star, Calendar, Info } from 'lucide-react';

const MovieDetailModal = ({ movie, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  const posterUrl = movie.image ? movie.image.original : 'https://via.placeholder.com/500x750?text=No+Image';
  const rating = movie.rating ? movie.rating.average : 'N/A';
  const year = movie.premiered ? movie.premiered.split('-')[0] : 'N/A';
  const genres = movie.genres ? movie.genres.join(', ') : 'N/A';

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal Content */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-base-100 shadow-2xl transition-all animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white transition-colors hover:bg-black/40 backdrop-blur-md"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Backdrop/Large Poster Image */}
          <div className="relative h-64 w-full lg:h-auto lg:w-1/3">
            <img 
              src={posterUrl} 
              alt={movie.name} 
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-base-100" />
          </div>

          {/* Details Content */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10">
            <h2 id="modal-title" className="mb-4 text-3xl font-black tracking-tight text-base-content sm:text-4xl">
              {movie.name}
            </h2>

            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm font-medium text-base-content/70">
              <div className="flex items-center gap-1.5">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="text-base-content">{rating}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-5 w-5 text-base-content/50" />
                <span>{year}</span>
              </div>
              {genres !== 'N/A' && (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                  {genres}
                </span>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-base-content">
                  <Info className="h-5 w-5 text-primary" />
                  Overview
                </h3>
                <p className="leading-relaxed text-base-content/80">
                  {movie.summary ? movie.summary.replace(/<[^>]*>?/gm, '') : 'No description available for this show.'}
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <button
                  onClick={onClose}
                  className="w-full rounded-xl bg-primary py-4 font-bold text-primary-content transition-all hover:bg-primary/90 active:scale-[0.98]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;
