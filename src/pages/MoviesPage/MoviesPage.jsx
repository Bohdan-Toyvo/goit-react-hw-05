import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../movie-api';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';
import toast from 'react-hot-toast';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        toast.error('Failed to fetch movies. Please try again.');
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchValue = form.elements.query.value.trim();

    if (!searchValue) {
      toast.error('Please enter a search query.');
      return;
    }

    setSearchParams({ query: searchValue });
    form.reset();
  };

  return (
    <div className={css.moviesPageContainer}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          name="query"
          placeholder="Search movies..."
          defaultValue={query}
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
