import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../movie-api';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError('Failed to fetch trending movies.', error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      
      <MovieList movies={movies} />
    </div>
  );
}