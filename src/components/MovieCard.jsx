import React from 'react';
import { Star, Calendar } from 'lucide-react';

const MovieCard = ({ movie, onSeeDetails }) => {
  const posterUrl = movie.image ? movie.image.medium : 'https://via.placeholder.com/210x295?text=No+Image';
  const rating = movie.rating ? movie.rating.average : 'N/A';
  const year = movie.premiered ? movie.premiered.split('-')[0] : 'N/A';

  return (
    <div className="flex flex-col bg-base-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-base-300">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={posterUrl} 
          alt={movie.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-base-content line-clamp-1 mb-2" title={movie.name}>
          {movie.name}
        </h3>
        <div className="flex items-center gap-3 text-sm text-base-content/70 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-base-content/50" />
            <span>{year}</span>
          </div>
        </div>
        <button 
          onClick={onSeeDetails}
          className="mt-auto w-full py-2 bg-primary text-primary-content font-bold rounded-lg transition-colors hover:bg-primary/90"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
