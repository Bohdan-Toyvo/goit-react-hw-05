import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../movie-api';
import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const results = await searchMovies(query);
        setMovies(results);
        setError(null);
      } catch (error) {
        setError('Failed to fetch movies.', error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchValue = form.elements.query.value.trim();

    if (!searchValue) return;

    setSearchParams({ query: searchValue });
    form.reset();
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" placeholder="Search movies..." defaultValue={query} />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}