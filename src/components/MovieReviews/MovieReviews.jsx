import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../movie-api';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError('Failed to load reviews.', error);
      }
    };

    fetchReviews();
  }, [movieId]);

 
  return (
    <ul >
      {reviews.map(review => (
        <li key={review.id} >
          <p><strong>Author:</strong> {review.author}</p>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}