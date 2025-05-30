import { useEffect, useRef, useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { getMovieDetails } from '../../movie-api';
import toast from 'react-hot-toast';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const backLinkRef = useRef(location.state || '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        toast.error('Error fetching movie details. Please try again.');
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(backLinkRef.current);
  };

  if (!movie) {
    return <p>Movie not found</p>;
  }

  const { title, overview, genres, vote_average, poster_path } = movie;

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={handleGoBack} style={{ marginBottom: '20px' }}>
        ← Go back
      </button>

      <div style={{ display: 'flex', gap: '20px' }}>
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={title}
          width="300"
        />
        <div>
          <h2>{title}</h2>
          <p>
            <strong>User score:</strong> {Math.round(vote_average * 10)}%
          </p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((g) => g.name).join(', ')}</p>
        </div>
      </div>

      <hr />

      <h3>Additional information</h3>
      <ul>
        <li>
          <Link to="cast" state={backLinkRef.current}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={backLinkRef.current}>
            Reviews
          </Link>
        </li>
      </ul>

      <hr />

      <Outlet />
    </div>
  );
}
