import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../movie-api';
import css from './MovieCast.module.css';
import toast from 'react-hot-toast';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch (error) {
        console.error('Error loading cast:', error);
        toast.error('Failed to load cast.');
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className={css.castContainer}>
      <ul className={css.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={css.castListItem}>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              width="300"
              height="375"
              className={css.actorPhoto}
            />
            <div className={css.actorDetails}>
              <p className={css.actorName}>
                <strong>{actor.name}</strong>
              </p>
              <p className={css.characterName}>Character: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
