import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import MovieDetailModal from './MovieDetailModal';

const MovieListing = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchAllShows = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.tvmaze.com/shows');
      setMovies(response.data);
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
      console.error('Error fetching all shows:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim() === '') {
      fetchAllShows();
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
      // TVMaze search returns objects with { score, show }
      setMovies(response.data.map(item => item.show));
    } catch (err) {
      setError('Failed to search for movies.');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllShows();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-base-content mb-4">Browse Movies</h1>
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-3 rounded-full border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-error mt-10">
            <p>{error}</p>
            <button 
              onClick={fetchAllShows}
              className="mt-4 bg-primary text-primary-content px-4 py-2 rounded-md font-semibold"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {movies.length === 0 ? (
              <div className="text-center text-base-content/60 mt-20">
                <p className="text-xl">No movies found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    onSeeDetails={() => setSelectedMovie(movie)} 
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {selectedMovie && (
        <MovieDetailModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
};

export default MovieListing;
