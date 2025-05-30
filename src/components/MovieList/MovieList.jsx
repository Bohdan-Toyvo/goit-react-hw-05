import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.movieListItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={location}
            className={css.movieLink}
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title || movie.name}
                className={css.moviePoster}
              />
            ) : (
              <div className={css.noPoster}>
                <p>No Poster Available</p>
              </div>
            )}
            <p className={css.movieTitle}>{movie.title || movie.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
