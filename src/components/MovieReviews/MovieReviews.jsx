import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../movie-api';
import css from './MovieReviews.module.css';
import toast from 'react-hot-toast';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error('Error loading reviews:', error);
        toast.error('Failed to load reviews. Please try again.');
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={css.reviewsContainer}>
      <ul className={css.reviewsList}>
        {reviews.map((review) => (
          <li key={review.id} className={css.reviewItem}>
            <p className={css.reviewAuthor}>
              <strong>Author:</strong> {review.author}
            </p>
            <p className={css.reviewContent}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
