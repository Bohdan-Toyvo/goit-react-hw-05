import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../movie-api';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch (error) {
        setError('Failed to load cast.', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            width="300"
            height="375"
          />
          <div>
            <p>
              <strong>{actor.name}</strong>
            </p>
            <p>Character: {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
