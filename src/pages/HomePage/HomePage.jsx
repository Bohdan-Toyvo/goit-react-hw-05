import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../movie-api';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';
import toast from 'react-hot-toast';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        toast.error('Failed to fetch trending movies.');
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className={css.homePageContainer}>
      <h1 className={css.trendingTitle}>Trending Today</h1>

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
